"use client";

import {
  useListVisibility,
  useVariableActions,
  useVariableDialog,
  useVariables,
} from "@/hooks/use-vars";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Loader2, Save, X } from "lucide-react";
import * as React from "react";
import { EyeOffIcon } from "../icons/eyeoff";
import { Button } from "./button";
import { TooltipMsg } from "../tooltip-msg";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

type DialogOverlayProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
> & {
  enableOverlay?: boolean;
};

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, enableOverlay = true, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      {
        "bg-white/90 dark:bg-black/40": enableOverlay,
      },
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface ExtendedDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  enableOverlay?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ExtendedDialogContentProps
>(({ className, children, enableOverlay, ...props }, ref) => {
  const updateVars = useMutation(api.template.updateVariables);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const variables = useVariables();
  const isDefaultListVisible = useListVisibility();
  const isVariableDialogOpen = useVariableDialog();
  const { toggleDefaultList } = useVariableActions();

  return (
    <>
      <DialogPortal>
        <DialogOverlay enableOverlay={enableOverlay}></DialogOverlay>
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            className
          )}
          {...props}
        >
          {children}

          <div className="flex items-center opacity-70 transition-opacity hover:opacity-100 gap-x-2 absolute right-1 top-1.5">
            {isVariableDialogOpen && (
              <>
                <TooltipMsg message="Save variables">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 hover:bg-muted-foreground/50"
                    onClick={async () => {
                      try {
                        setIsSubmitting(true);
                        await updateVars({ updates: variables });
                      } catch (error) {
                        console.error("Variable error: ", error);
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span className="sr-only">Save variables</span>
                  </Button>
                </TooltipMsg>

                <TooltipMsg message="Toggle default variables">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 hover:bg-muted-foreground/50"
                    onClick={() => toggleDefaultList(!isDefaultListVisible)}
                  >
                    <EyeOffIcon className="h-4" />
                    <span className="sr-only">Toggle default variables</span>
                  </Button>
                </TooltipMsg>
              </>
            )}
            <DialogPrimitive.Close
              className=" rounded-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              asChild
            >
              <Button
                variant="ghost"
                size="icon"
                className="size-7 hover:bg-muted-foreground/50"
              >
                <X className="h-4" />
                <span className="sr-only">Close btn</span>
              </Button>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

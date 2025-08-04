import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipMsg = {
  children: React.ReactNode;
  message: string;
};

const TooltipMsg = (props: TooltipMsg) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent>
          <p>{props.message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { TooltipMsg };

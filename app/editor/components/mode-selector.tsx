"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import { cn, TemplateMode, TemplateSelector } from "@/lib/utils";
import { PopoverProps } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface ModeSelectorProps extends PopoverProps {
  selectedMode: TemplateMode;
  setSelectedMode: Dispatch<SetStateAction<TemplateMode>>;
  selectedTemplate: TemplateSelector | null;
}

export interface Mode {
  id: string;
  name: string;
  description: string;
  type: TemplateMode;
}

const modes: Mode[] = [
  {
    id: "1",
    name: "Text email",
    description:
      "Simple, plain-text emails that are reliable and minimal—but offer limited customization.",
    type: "Text",
  },
  {
    id: "2",
    name: "Jsx email",
    description:
      "Fully customizable templates built with JSX, powered by Resend. Ideal for rich, branded emails.",
    type: "Jsx",
  },
];

export function ModeSelector({
  selectedMode,
  selectedTemplate,
  setSelectedMode,
  ...props
}: ModeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [peekedMode, setPeekedMode] = useState<Mode>(modes[0]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    setPeekedMode(modes[0]);
  }, []);

  useEffect(() => {
    const mode = peekedMode;
    const template = selectedTemplate;

    if (!template) return;

    if (mode.type === "Jsx" && template.templateId === "utils") {
      setIsDisabled(true);
      return;
    } else {
      setIsDisabled(false);
    }

    if (mode.type === "Text" && template.templateId === "utils") {
      setPeekedMode(modes[1]);
      return;
    }
  }, [selectedTemplate]);

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="mode">Mode</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          This determines the type of email template to show your supporters.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={isDisabled}
            aria-expanded={open}
            aria-label="Select a mode"
            className="w-full justify-between"
          >
            {selectedMode ? selectedMode : "Select a mode..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            <HoverCardContent
              side="left"
              align="start"
              forceMount
              className="min-h-[120px]"
            >
              <div className="grid gap-2">
                <h4 className="font-medium leading-none">{peekedMode.name}</h4>
                <div className="text-sm text-muted-foreground">
                  {peekedMode.description}
                </div>
              </div>
            </HoverCardContent>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandEmpty>No Modes found.</CommandEmpty>
                <HoverCardTrigger />
                <CommandGroup heading={"Modes"}>
                  {modes.map((mode) => (
                    <ModeItem
                      key={mode.id}
                      mode={mode}
                      isSelected={selectedMode === mode.type}
                      onPeek={(mode) => setPeekedMode(mode)}
                      onSelect={() => {
                        setSelectedMode(mode.type);
                        setOpen(false);
                      }}
                    />
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface ModeItemProps {
  mode: Mode;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (mode: Mode) => void;
}

function ModeItem({ mode, isSelected, onSelect, onPeek }: ModeItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onPeek(mode);
      }
    });
  });

  return (
    <CommandItem
      key={mode.id}
      onSelect={onSelect}
      ref={ref}
      className="data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
    >
      {mode.name}
      <Check
        className={cn("ml-auto", isSelected ? "opacity-100" : "opacity-0")}
      />
    </CommandItem>
  );
}

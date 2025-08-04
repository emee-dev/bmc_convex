import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useListVisibility,
  useVariableActions,
  Variable,
  VariableActions,
} from "@/hooks/use-vars";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

type VarsDialogProps = {
  dialogOpen: boolean;
  variables: Variable[];
  setDialogOpen: (state: boolean) => void;
};

export function VarsDialog({
  variables,
  dialogOpen,
  setDialogOpen,
}: VarsDialogProps) {
  const isDefaultListHidden = useListVisibility();
  const { addVariable, deleteVariable, updateVariable, toggleVariable } =
    useVariableActions();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[800px] p-0 max-h-[90vh] shadow-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Template variables</DialogTitle>
          <DialogDescription>Dialog for managing variables.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 p-4 mt-6">
          <div className="space-y-2 h-[390px] overflow-y-scroll scrollbar-hide font-geist">
            {variables.map((variable) => (
              <VariableItem
                key={variable.id}
                variable={variable}
                deleteVariable={deleteVariable}
                updateVariable={updateVariable}
                toggleVariable={toggleVariable}
                isDefaultListHidden={isDefaultListHidden}
              />
            ))}
            <VariableInput addVariable={addVariable} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

type VariableItemProps = {
  variable: Variable;
  deleteVariable: VariableActions["deleteVariable"];
  updateVariable: VariableActions["updateVariable"];
  toggleVariable: VariableActions["toggleVariable"];
  isDefaultListHidden: boolean;
};

const VariableItem = ({
  variable,
  deleteVariable,
  updateVariable,
  toggleVariable,
  isDefaultListHidden,
}: VariableItemProps) => {
  if (variable.is_default === "yes" && isDefaultListHidden === true) {
    return <></>;
  }

  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-shrink-0">
        <div
          className={cn(
            "p-0 size-4 border-[1.1px] hover:border-primary/50 rounded-sm",
            {
              "border-primary hover:border-primary": variable.is_enabled,
            }
          )}
          onClick={() => {
            if (variable.is_default === "no") {
              toggleVariable({
                id: variable.id,
                is_enabled: !variable.is_enabled,
              });
            }
          }}
        >
          {variable.is_default === "no" && (
            <Check
              className={cn(
                "size-full",
                variable.is_enabled ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          {variable.is_default === "yes" && (
            <X className={cn("size-full opacity-100")} />
          )}
        </div>
      </div>
      <Input
        autoFocus
        placeholder="variable name"
        disabled={variable.is_default === "yes"}
        value={variable.key}
        onChange={(e) => {
          updateVariable({
            id: variable.id,
            field: "key",
            value: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "_"),
            is_enabled: variable.is_enabled,
          });
        }}
        className={cn("h-8", !variable.is_enabled && "opacity-50")}
      />
      <Input
        placeholder="value"
        disabled={variable.is_default === "yes"}
        value={variable.value}
        onChange={(e) => {
          updateVariable({
            id: variable.id,
            field: "value",
            value: e.target.value,
            is_enabled: variable.is_enabled,
          });
        }}
        className={cn("h-8", !variable.is_enabled && "opacity-50")}
      />
      <Button
        variant="ghost"
        size="sm"
        disabled={variable.is_default === "yes"}
        className="flex-shrink-0 w-8 h-8 p-0"
        onClick={() => deleteVariable(variable.key)}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

const VariableInput = ({
  addVariable,
}: {
  addVariable: VariableActions["addVariable"];
}) => {
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-shrink-0 p-0 size-4"></div>
      <Input
        placeholder="variable name"
        onFocus={(e) => {
          addVariable({
            id: crypto.randomUUID(),
            key: "",
            value: "",
            is_enabled: true,
            is_default: "no",
          });
          e.currentTarget.blur();
        }}
        className={cn("h-8 opacity-80")}
      />
      <Input
        placeholder="value"
        onFocus={(e) => {
          addVariable({
            id: crypto.randomUUID(),
            key: "",
            value: "",
            is_enabled: true,
            is_default: "no",
          });
          e.currentTarget.blur();
        }}
        className={cn("h-8 opacity-80")}
      />
      <div className="flex-shrink-0 w-8 h-8 p-0"></div>
    </div>
  );
};

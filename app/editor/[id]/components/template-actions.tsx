"use client";

import { FilePenLineIcon } from "@/components/icons/file-pen";
import { GripIcon } from "@/components/icons/grip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VarsDialog } from "@/components/variable-dialog";
import {
  useVariableActions,
  useVariableDialog,
  useVariables,
} from "@/hooks/use-vars";

export function TemplateActions() {
  const variables = useVariables();
  const isVariableDialogOpen = useVariableDialog();
  const { toggleVarsDialog } = useVariableActions();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <span className="sr-only">Actions</span>
            <GripIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => toggleVarsDialog(!isVariableDialogOpen)}
          >
            <FilePenLineIcon className="w-4 h-4 mr-1" />
            Edit variables
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <VarsDialog
        variables={variables}
        dialogOpen={isVariableDialogOpen}
        setDialogOpen={toggleVarsDialog}
      />
    </>
  );
}

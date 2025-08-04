"use client";

import { create } from "zustand";

export interface Variable {
  id: string;
  key: string;
  value: string;
  is_enabled: boolean;
  is_default?: "yes" | "no" | undefined;
  description?: string | undefined;
}

export type VariableActions = {
  addVariable: (args: Variable) => void;
  updateVariable: (args: {
    id: string;
    field: "key" | "value";
    value: string;
    is_enabled: boolean;
  }) => void;
  deleteVariable: (key: string) => void;
  toggleVariable: (args: { id: string; is_enabled: boolean }) => void;
  toggleDefaultList: (state: boolean) => void;
  toggleVarsDialog: (state: boolean) => void;
  init: (vars: Variable[]) => void;
};

type VariableState = {
  isDialogOpen: boolean;
  isDefaultHidden: boolean;
  vars: Variable[];
  actions: VariableActions;
};

const useVariableStore = create<VariableState>((set, get) => ({
  vars: [],
  isDialogOpen: false,
  isDefaultHidden: true,
  actions: {
    addVariable: (arg) => {
      const oldVars = get().vars;

      const existsAlready = oldVars.find(
        (item) => item.id === arg.id || item.key === arg.key
      );

      if (existsAlready) {
        return;
      }

      const vars = [...oldVars, arg];

      set({ vars });
    },

    updateVariable: (args) => {
      const oldVars = get().vars;

      const vars = oldVars.map((item) => {
        if (item.id === args.id) {
          item[args.field] = args.value;
        }

        return item;
      });

      set({ vars });
    },

    deleteVariable: (key) =>
      set((state) => {
        const vars = state.vars.filter((item) => item.key !== key);

        return { vars: vars };
      }),

    toggleVariable: (args) => {
      const oldVars = get().vars;

      const vars = oldVars.map((item) => {
        if (item.id === args.id) {
          item["is_enabled"] = args.is_enabled;
        }

        return item;
      });

      set({ vars });
    },
    toggleDefaultList: (args) => set((state) => ({ isDefaultHidden: args })),
    toggleVarsDialog: (args) => set((state) => ({ isDialogOpen: args })),
    init: (vars) => set((_) => ({ vars })),
  },
}));

export const useVariableDialog = () =>
  useVariableStore((state) => state.isDialogOpen);
export const useVariables = () => useVariableStore((state) => state.vars);
export const useVariableActions = () =>
  useVariableStore((state) => state.actions);

export const useListVisibility = () =>
  useVariableStore((state) => state.isDefaultHidden);

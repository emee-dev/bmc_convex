"use client";

import { Variable } from "@/hooks/use-vars";
import {
  Decoration,
  DecorationSet,
  EditorView,
  MatchDecorator,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";

export type DecoratorFn = (source: string) => void;

const VARIABLE_REGEX =
  /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z0-9_]+)*)\s*\}\}/g;
const VARIABLE_DECORATOR_SELECTOR = "cm-env-variable";

type GetVariables = () => Variable[] | null;

export type DecoratorListener = (event: CustomEvent<string>) => void;

class VariableWidget extends WidgetType {
  private clickHandler: (e: MouseEvent) => void;
  private mouseOverHandler: (e: MouseEvent) => void;
  private mouseOutHandler: (e: MouseEvent) => void;

  constructor(
    private extId: number,
    private varName: string,
    private getVars: GetVariables
  ) {
    super();

    this.clickHandler = function (e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
    };

    this.mouseOverHandler = function (e) {
      const target = e.currentTarget as HTMLElement;

      if (target.classList.contains(VARIABLE_DECORATOR_SELECTOR)) {
        const varValue = target.dataset.var_value;

        const existingTooltip = document.querySelector(".env-var-tooltip");
        if (existingTooltip) {
          existingTooltip.remove();
        }

        const tooltip = document.createElement("div");
        tooltip.className = "env-var-tooltip";
        tooltip.textContent = `${varValue ? varValue : "Missing value"}`;

        Object.assign(tooltip.style, {
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          zIndex: "1000",
        });

        // tooltip pos
        const rect = target.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
        tooltip.style.left = `${rect.left + window.scrollX}px`;

        document.body.appendChild(tooltip);
      }
    };

    this.mouseOutHandler = function (e) {
      const target = e.currentTarget as HTMLElement;
      if (target.classList.contains(VARIABLE_DECORATOR_SELECTOR)) {
        const tooltip = document.querySelector(".env-var-tooltip");
        if (tooltip) {
          tooltip.remove();
        }
      }
    };
  }

  eq(other: WidgetType): boolean {
    return (
      other instanceof VariableWidget &&
      this.varName === other.varName &&
      this.extId === other.extId
    );
  }

  toDOM(): HTMLElement {
    const wrapper = document.createElement("span");

    const leftPad = document.createElement("span");
    const content = document.createElement("span");
    const rightPad = document.createElement("span");

    const value = this.getVariableValue();

    leftPad.innerHTML = "&nbsp;";
    rightPad.innerHTML = "&nbsp;";

    // Content span
    content.textContent = this.varName;
    content.dataset.role = "content";

    wrapper.className = this.styleDecorator(value);

    wrapper.dataset.var_name = this.varName;
    wrapper.dataset.var_value = value || "";

    wrapper.addEventListener("click", this.clickHandler);
    wrapper.addEventListener("mouseover", this.mouseOverHandler);
    wrapper.addEventListener("mouseout", this.mouseOutHandler);

    wrapper.appendChild(leftPad);
    wrapper.appendChild(content);
    wrapper.appendChild(rightPad);

    return wrapper;
  }

  updateDOM(wrapper: HTMLElement, _: EditorView): boolean {
    const content = wrapper.querySelector(
      '[data-role="content"]'
    ) as HTMLElement;

    const value = this.getVariableValue();

    content.textContent = this.varName;
    wrapper.className = this.styleDecorator(value);

    wrapper.dataset.var_name = this.varName;
    wrapper.dataset.var_value = value || "";

    return true;
  }

  destroy(wrapper: HTMLElement): void {
    wrapper.removeEventListener("click", this.clickHandler);
    wrapper.removeEventListener("mouseover", this.mouseOverHandler);
    wrapper.removeEventListener("mouseout", this.mouseOutHandler);
  }

  ignoreEvent(): boolean {
    return false;
  }

  private styleDecorator(value: string | undefined): string {
    return `${VARIABLE_DECORATOR_SELECTOR} rounded-[2px] text-xs cursor-pointer outline outline-1 ${
      value
        ? "bg-green-400/60 outline-white/70 dark:bg-primary/80 dark:outline-white/40"
        : "bg-red-500/50 outline-white/70 dark:outline-white/40"
    }`;
  }

  private getVariableValue(): string | undefined {
    return this.getVars()?.find((v) => v.key === this.varName)?.value;
  }
}

const variablesMatcher = (extId: number, getVars: GetVariables) => {
  return new MatchDecorator({
    regexp: VARIABLE_REGEX,
    decoration: (match) =>
      Decoration.replace({
        widget: new VariableWidget(extId, match[1], getVars),
        side: 1,
      }),
  });
};

export const variables = (extId: number, getVars: GetVariables) =>
  ViewPlugin.fromClass(
    class {
      placeholders: DecorationSet;
      constructor(view: EditorView) {
        this.placeholders = variablesMatcher(extId, getVars).createDeco(view);
      }

      update(update: ViewUpdate) {
        if (
          update.docChanged ||
          update.viewportChanged ||
          update.transactions.some((t) => t.effects.length > 0)
        ) {
          this.placeholders = variablesMatcher(extId, getVars).updateDeco(
            update,
            this.placeholders
          );
        }
      }
    },
    {
      decorations: (instance) => instance.placeholders,
      provide: (plugin) =>
        EditorView.atomicRanges.of((view) => {
          return view.plugin(plugin)?.placeholders || Decoration.none;
        }),
    }
  );

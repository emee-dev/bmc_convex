"use client";

import { Variable } from "@/hooks/use-vars";
import { cn } from "@/lib/utils";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import {
  bracketMatching,
  defaultHighlightStyle,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { lintKeymap } from "@codemirror/lint";
import { searchKeymap } from "@codemirror/search";
import { Compartment, EditorState, Extension } from "@codemirror/state";
import {
  crosshairCursor,
  dropCursor,
  EditorView,
  highlightSpecialChars,
  keymap,
  lineNumbers as lineNumbersExtension,
  placeholder,
  rectangularSelection,
} from "@codemirror/view";
import { CSSProperties, RefObject, useEffect, useRef } from "react";
import { variables } from "./editor-utils";
import { vscodeLight } from "@uiw/codemirror-theme-vscode";

interface CodeEditorProps {
  value: string;
  className?: string;
  readOnly?: boolean;
  lineWrap?: boolean;
  lineNumbers?: boolean;
  onChange?: (value: string) => void;
  language?: "text" | "javascript";
  placeholder?: string;
  vars?: Variable[];
  ref?: RefObject<EditorView | null>;
  enableVars?: boolean;
}

type Css = { [selector: string]: CSSProperties };

const editorTheme = EditorView.theme({
  "&": { backgroundColor: "transparent" },
  "&.cm-editor": { backgroundColor: "transparent" },
  ".cm-content": { fontFamily: "var(--font-mono)", fontSize: "13px" },
  ".cm-gutters": {
    border: "none",
    backgroundColor: "transparent",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
  },
  ".cm-activeLine": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
  ".cm-activeLineGutter": { backgroundColor: "transparent" },
  ".cm-line": { fontFamily: "var(--font-mono)" },
  ".cm-scroller": {
    overflow: "auto",
    backgroundColor: "transparent",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  ".cm-scroller::-webkit-scrollbar": { display: "none" },
  "&.cm-editor.cm-focused": { outline: "none" },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#d8b4fe",
  },
} satisfies Css);

const baseExtensions: Extension[] = [
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  highlightSpecialChars(),
  history(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  rectangularSelection(),
  crosshairCursor(),
  keymap.of([
    indentWithTab,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...closeBracketsKeymap,
    ...lintKeymap,
  ]),
];

export function CodeEditor({
  lineWrap = false,
  language = "text",
  onChange,
  readOnly,
  lineNumbers,
  className,
  enableVars,
  value,
  vars,
  ref,
  placeholder: placeholderText = "No file is selected...",
}: CodeEditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const varCompartment = useRef(new Compartment());
  const readOnlyCompartment = useRef(new Compartment());
  const placeholderCompartment = useRef(new Compartment());

  const variablesRef = useRef<Variable[]>([]);
  const extIdRef = useRef(0);

  useEffect(() => {
    if (!editorContainerRef.current) return;
    viewRef.current?.destroy();

    const lang =
      language === "text" ? [] : javascript({ jsx: true, typescript: true });

    const extensions: Extension[] = [
      lang,
      vscodeLight,
      editorTheme,
      baseExtensions,
      readOnlyCompartment.current.of(EditorView.editable.of(true)),
      placeholderCompartment.current.of(placeholder(placeholderText)),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) onChange?.(update.state.doc.toString());
      }),
    ];

    if (enableVars === true) {
      extensions.push(
        varCompartment.current.of(
          variables(extIdRef.current, () => variablesRef.current)
        )
      );
    }

    // if (readOnly) extensions.push(EditorState.readOnly.of(true));
    if (lineWrap) extensions.push(EditorView.lineWrapping);
    if (lineNumbers) extensions.push(lineNumbersExtension());

    const state = EditorState.create({ doc: value, extensions });

    viewRef.current = new EditorView({
      state,
      parent: editorContainerRef.current,
    });

    if (ref) {
      ref.current = viewRef.current;
    }

    return () => viewRef.current?.destroy();
  }, [language, enableVars]);

  useEffect(() => {
    if (!vars) return;

    variablesRef.current = vars;
    extIdRef.current += 1;
  }, [vars]);

  // Configure readonly
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    if (readOnly === undefined) return;

    const isReadOnly = Boolean(readOnly);

    view.dispatch({
      effects: readOnlyCompartment.current.reconfigure(
        EditorView.editable.of(isReadOnly)
      ),
    });
  }, [readOnly]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    if (!enableVars || enableVars !== true) return;

    view.dispatch({
      effects: [
        varCompartment.current.reconfigure(
          variables(extIdRef.current, () => variablesRef.current)
        ),
      ],
    });
  }, [vars]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    view.dispatch({
      effects: [
        placeholderCompartment.current.reconfigure(
          placeholder(placeholderText)
        ),
      ],
    });
  }, [placeholderText]);

  useEffect(() => {
    const view = viewRef.current;
    if (view && value !== view.state.doc.toString()) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div className={cn("relative ", className)}>
      <div ref={editorContainerRef} className="h-full"></div>
    </div>
  );
}

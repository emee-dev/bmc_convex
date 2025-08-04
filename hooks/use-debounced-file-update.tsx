import { TemplateSelector } from "@/lib/utils";
import { emailIds } from "@/lib/webcontainer";
import type { WebContainer } from "@webcontainer/api";
import { useCallback, useRef } from "react";

const writeFile = async (
  templateId: TemplateSelector["templateId"],
  content: string,
  instance: WebContainer
) => {
  if (templateId !== "utils" && emailIds.includes(templateId)) {
    await instance.fs.writeFile(`${templateId}.tsx`, content);
  } else {
    await instance.fs.writeFile(`${templateId}.ts`, content);
  }
};

const writeNewsletterFile = async (
  filename: "newsletter.tsx",
  content: string,
  instance: WebContainer
) => {
  await instance.fs.writeFile(filename, content);
};

export function useDebouncedFileUpdate(delay = 500) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateTemplateFile = useCallback(
    (
      templateId: TemplateSelector["templateId"] | undefined,
      content: string,
      instance: WebContainer | undefined
    ) => {
      if (!templateId || !instance || !content) return;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        writeFile(templateId, content, instance).catch(console.error);
      }, delay);
    },
    [delay]
  );

  const updateNewsletterFile = useCallback(
    (
      filename: "newsletter.tsx",
      content: string,
      instance: WebContainer | undefined
    ) => {
      if (!filename || !instance || !content) return;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        writeNewsletterFile(filename, content, instance).catch(console.error);
      }, delay);
    },
    [delay]
  );

  return { updateTemplateFile, updateNewsletterFile };
}

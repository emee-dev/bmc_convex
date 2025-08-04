import { Variable } from "@/hooks/use-vars";
import {
  EmailTemplate,
  toPreviewVariables,
  toRuntimeVariables,
} from "@/lib/utils";
import type { WebContainer } from "@webcontainer/api";
import { useCallback, useState } from "react";

type TemplateId = EmailTemplate["templateId"];

type RenderResult = {
  preview_content: string | null;
  /** This is rendered from JSX ready to be sent to client. */
  html_content: string | null;
};

export function useRenderScript(
  script: "render_template.tsx" | "newsletter.tsx"
) {
  const [data, setData] = useState<RenderResult | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isPending, setIsPending] = useState(false);

  const runTemplate = useCallback(
    async (scriptId: TemplateId, vars: Variable[], instance: WebContainer) => {
      setIsPending(true);
      setData(null);
      setError(null);

      try {
        const content = prepareTemplate(scriptId, vars);

        console.log("Content: ", content);

        // Overwrite the render script
        await instance.fs.writeFile(script, content);

        const evalProcess = await instance.spawn("pnpm", ["tsx", script]);

        const result = await new Promise<RenderResult>((resolve, reject) => {
          evalProcess.output
            .pipeTo(
              new WritableStream({
                write(data) {
                  resolve(safeJSONParse(data));
                },
                abort(error) {
                  reject(error);
                },
              })
            )
            .catch(reject);
        });

        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  const runNewsletter = useCallback(async (instance: WebContainer) => {
    setIsPending(true);
    setData(null);
    setError(null);

    if (script !== "newsletter.tsx") return;

    try {
      const content = prepareNewsletter(script);
      console.log("Content: ", content);

      // Overwrite the render script
      await instance.fs.writeFile(script, content);

      const evalProcess = await instance.spawn("pnpm", ["tsx", script]);

      const result = await new Promise<RenderResult>((resolve, reject) => {
        evalProcess.output
          .pipeTo(
            new WritableStream({
              write(data) {
                resolve(safeJSONParse(data));
              },
              abort(error) {
                reject(error);
              },
            })
          )
          .catch(reject);
      });

      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsPending(false);
    }
  }, []);

  return { runTemplate, runNewsletter, isPending, data, error };
}

export const prepareTemplate = (
  selectedTemplate: TemplateId,
  vars: Variable[]
): string => {
  const previewVars = toPreviewVariables(vars);
  const runtimeVars = toRuntimeVariables(vars);

  const content = `import React from "react";
  import { pretty, render } from "@react-email/render";
  import Template from "./${selectedTemplate}";
  
  const previewVars = ${JSON.stringify(previewVars, null, 2)};
  const runtimeVars = ${JSON.stringify(runtimeVars, null, 2)};
  
  // Compiles JSX to be viewed in editor
  async function renderPreviewHtml() {
    const html = await render(<Template variables={previewVars} />);
    const formatted = await pretty(html);
    return formatted;
  }
  
  // Compiles JSX to be sent to users (Convex does not support JSX)
  async function renderRuntimeHtml() {
    const html = await render(<Template variables={runtimeVars} />);
    const formatted = await pretty(html);
    return formatted;
  }
  
  async function main() {
    const [preview_content, html_content] = await Promise.all([
      renderPreviewHtml(),
      renderRuntimeHtml(),
    ]);
  
    process.stdout.write(
      JSON.stringify({
        preview_content,
        html_content,
      })
    );
  }
  
  main();
  `;

  return content;
};

export const prepareNewsletter = (newsletter: "newsletter.tsx"): string => {
  const content = `import React from "react";
  import { pretty, render } from "@react-email/render";
  import Template from "./${newsletter}";
  
  // No variables supported
  async function renderRuntimeHtml() {
    const html = await render(<Template variables={{}} />);
    const formatted = await pretty(html);
    return formatted;
  }
  
  async function main() {
    const html_content = await renderRuntimeHtml();
  
    process.stdout.write(
      JSON.stringify({
        preview_content: "",
        html_content,
      })
    );
  }
  
  main();
  `;

  return content;
};

function safeJSONParse(json: string): RenderResult {
  try {
    const parsed = JSON.parse(json);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "preview_content" in parsed &&
      "html_content" in parsed
    ) {
      return {
        preview_content: parsed.preview_content ?? null,
        html_content: parsed.html_content ?? null,
      };
    }

    // fall back
    return {
      preview_content: null,
      html_content: null,
    };
  } catch {
    return {
      preview_content: null,
      html_content: null,
    };
  }
}

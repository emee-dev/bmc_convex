import { Doc, Id } from "@/convex/_generated/dataModel";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Variable } from "@/hooks/use-vars";

export type TemplateMode = Doc<"templates">["default_template"];
export type Templates = {
  _id: string;
  name: string;
  templateId: Doc<"templates">["templateId"];
};

type EmailTemplate = {
  _id: Id<"templates">;
  _creationTime: number;
  userId: string;
  name: string;
  text_template: string;
  raw_jsx_content: string;
  html_content: string;
  templateId: Doc<"templates">["templateId"];
  default_template: Doc<"templates">["default_template"];
};

type UtilityTemplate = {
  _id: Id<"utility_files">;
  _creationTime: number;
  userId: string;
  name: string;
  templateId: "utils";
  file_content: string;
};

export type TemplateSelector = EmailTemplate | UtilityTemplate;

export type TemplateId = Doc<"templates">["templateId"];
export type AllTemplateId = TemplateSelector["templateId"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a flat list of variable definitions into a nested object
 * with actual values.
 *
 * This is typically used in local or production previews where real values
 * are required to render the email content (e.g., inside webcontainers or production).
 *
 * Example:
 * Input: [{ key: "creator.page", value: "https://example.com" }]
 * Output: { creator: { page: "https://example.com" } }
 *
 * @param variables - An array of variable objects with dot-notated keys.
 * @returns A deeply nested object with resolved variable values.
 */
export function toPreviewVariables(variables: Variable[]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const { key, value } of variables) {
    const parts = key.split(".");
    let current = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // If it's the last part, assign the value
      if (i === parts.length - 1) {
        current[part] = value;
      } else {
        // If the nested object doesn't exist, create it
        if (!current[part] || typeof current[part] !== "object") {
          current[part] = {};
        }

        current = current[part];
      }
    }
  }

  return result;
}

/**
 * Converts a flat list of variable definitions into a nested object
 * with Handlebars expressions.
 *
 * This is used in server-rendered environments like Convex where the
 * variables are not resolved yet but should remain dynamic for later
 * processing.
 *
 * Example:
 * Input: [{ key: "creator.page", value: "<dynamic>" }]
 * Output: { creator: { page: "{{ creator.page }}" } }
 *
 * @param variables - An array of variable objects with dot-notated keys.
 * @returns A deeply nested object with Handlebars variable placeholders.
 */
export function toRuntimeVariables(variables: Variable[]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const { key, value } of variables) {
    const parts = key.split(".");
    let current = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // If it's the last part, assign the value
      if (i === parts.length - 1) {
        current[part] = `{{ ${parts.join(".")} }}`;
      } else {
        // If the nested object doesn't exist, create it
        if (!current[part] || typeof current[part] !== "object") {
          current[part] = {};
        }

        current = current[part];
      }
    }
  }

  return result;
}

export const preparePreviewScript = (
  selectedTemplate: string,
  vars: Variable[]
): string => {
  // Expand variables
  const variables = toPreviewVariables(vars);

  const content = `import { pretty, render } from "@react-email/render";
  import Template from './${selectedTemplate}.tsx';

  const vars = ${JSON.stringify(variables)};

  async function renderer() { 
    const html = await render(<Template variables={vars} />);
    const formatted = await pretty(html);

    // return data to react
    process.stdout.write(formatted); 
  };

  renderer();
  `;

  return content;
};

export const prepareRuntimeScript = (
  selectedTemplate: string,
  vars: Variable[]
): string => {
  // Expand variables
  const variables = toRuntimeVariables(vars);

  const content = `import { pretty, render } from "@react-email/render";
    import Template from './${selectedTemplate}.tsx';
  
    const vars = ${JSON.stringify(variables)};
  
    async function renderer() { 
      const html = await render(<Template variables={vars} />);
      const formatted = await pretty(html);
  
      // return data to react
      process.stdout.write(formatted);
    };
  
    renderer();
    `;

  return content;
};

/**
 * Registers a `helperMissing` handler to preserve unresolved Handlebars variables.
 * Example: `{{name}}` will remain `{{name}}` if `name` is not in the context.
 */
export function preserveMissingVariables(
  handlebarsInstance: typeof Handlebars
) {
  handlebarsInstance.registerHelper("helperMissing", function (...args) {
    const options = args.pop();
    const variableName = options?.name ?? "unknown";
    return `{{${variableName}}}`;
  });
}

type WebcontainerFile = {
  path: "render_template.tsx";
  data: string;
};

export const prepareTemplate = (
  selectedTemplate: string,
  vars: Variable[]
): WebcontainerFile => {
  const previewVars = toPreviewVariables(vars);
  const runtimeVars = toRuntimeVariables(vars);

  const content = `import { pretty, render } from "@react-email/render";
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
  const preview_content = await renderPreviewHtml();
  const html_content = await renderRuntimeHtml();

  process.stdout.write(
    JSON.stringify({
      preview_content,
      html_content,
    })
  );
}

main();
`;

  return { path: "render_template.tsx", data: content };
};

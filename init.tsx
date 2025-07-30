import { VariableAsProps } from "@/emails/utils";
import { vars } from "@/emails/vars";
import { TemplateId, toRuntimeVariables } from "@/lib/utils";
import { pretty, render } from "@react-email/render";
import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const templates: TemplateId[] = [
  "monthly_donation_subscription",
  "monthly_donation_cancellation",
  "onetime_gold_donation",
  "onetime_silver_donation",
  "onetime_bronse_donation",
  "newsletter_subscription",
  "newsletter_cancellation",
];

const emailsDir = path.join(__dirname, "./emails");
const outputFile = path.join(__dirname, "./lib/template.tsx");
const utilsFile = path.join(__dirname, "./emails/utils.ts");

async function prepareRuntimeScript(template: any) {
  const Template = template;
  const runtimeObj = toRuntimeVariables(vars) as VariableAsProps;
  const html = await render(<Template variables={runtimeObj} />);
  const formatted = await pretty(html);
  return formatted;
}

const readWithoutFirstLine = async (filePath: string): Promise<string> => {
  const content = await readFile(filePath, "utf8");
  const [, ...lines] = content.split("\n");
  return lines.join("\n");
};

async function jsxToHtml() {
  const htmlTemplates: Record<string, string> = {};
  for (const id of templates) {
    const dir = await readdir(emailsDir);

    const file = dir.find((f) => f.toLowerCase().includes(id));

    if (!file) {
      console.warn(`⚠️ Could not find file for template: ${id}`);
      continue;
    }

    const fullPath = path.join(emailsDir, file);

    // Dynamically import and get default export
    const module = await import(fullPath);
    const Component = module.default;

    if (!Component) {
      console.warn(`⚠️ No default export found in ${file}`);
      continue;
    }

    const html = await prepareRuntimeScript(Component);
    htmlTemplates[id] = html.trim();
  }

  const htmlTemplatesObject = Object.entries(htmlTemplates)
    .map(([key, val]) => `  ${key}: \`${val.replace(/`/g, "\\`")}\``)
    .join(",\n");

  return htmlTemplatesObject;
}

async function generateTemplates() {
  const files = await readdir(emailsDir);

  const textFilePath = path.join(emailsDir, "text.tsx");
  const cleanedText = await readWithoutFirstLine(textFilePath);
  const utilsFileContent = await readFile(utilsFile, "utf8");

  const jsxTemplates: Record<string, string> = {};

  for (const file of files) {
    const lowerFile = file.toLowerCase();
    const matchedTemplate = templates.find((template) =>
      lowerFile.includes(template)
    );

    if (
      matchedTemplate &&
      file !== "text.tsx" &&
      file !== "vars.tsx" &&
      file.endsWith(".tsx")
    ) {
      const modulePath = path.join(emailsDir, file);
      const source = await readFile(modulePath, "utf8");

      jsxTemplates[matchedTemplate] = source.trim();
    }
  }

  const jsxTemplatesObject = Object.entries(jsxTemplates)
    .map(([key, val]) => `  ${key}: \`${val.replace(/`/g, "\\`")}\``)
    .join(",\n");

  const htmlTemplatesObject = await jsxToHtml();

  const finalOutput = `/**
* ⚠️ This file is auto-generated. Do not edit directly.
* To make changes, edit the files in the \`emails\` directory
* and then run \`pnpm run init\` to regenerate this file.
*/

import { TemplateId } from "@/lib/utils";
${cleanedText}

export const jsx_templates: Record<TemplateId, string> = {
${jsxTemplatesObject}
};

export const html_templates: Record<TemplateId, string> = {
${htmlTemplatesObject}
};

export const utils = \`
${utilsFileContent.trim()}
\`
`;

  const libsDir = path.dirname(outputFile);
  await mkdir(libsDir, { recursive: true });
  await writeFile(outputFile, finalOutput, "utf8");
  console.log("✅ Generated libs/template.tsx successfully");
}

generateTemplates().catch((err) => {
  console.error("❌ Error generating templates:", err);
  process.exit(1);
});

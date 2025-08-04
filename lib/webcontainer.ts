import { DirEnt, FileSystemTree, WebContainer } from "@webcontainer/api";
import { TemplateId, TemplateSelector } from "./utils";

export const initialFiles: FileSystemTree = {
  "package.json": {
    file: {
      contents: `{
    "name": "resend-jsx",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {},
    "dependencies": {
      "@react-email/components": "0.3.2",
      "@react-email/render": "1.1.3",
      "tsx": "4.20.3"
    }
  }`,
    },
  },
  "tsconfig.json": {
    file: {
      contents: `{
    "compilerOptions": {
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "target": "ES6",
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "paths": {
        "@/*": ["./*"]
      }
    },
    "include": ["**/*.ts", "**/*.tsx"],
    "exclude": ["node_modules"]
  }`,
    },
  },
  "render_template.tsx": {
    file: {
      contents: `process.stdout.write(
  JSON.stringify({
    preview_content: "This is preview.",
    html_content: "This is HTML.",
  })
);
`,
    },
  },
  "newsletter.tsx": {
    file: {
      contents: `process.stdout.write(
  JSON.stringify({
    preview_content: "This is preview.",
  })
);
`,
    },
  },
  "monthly_donation_subscription.tsx": {
    file: {
      contents: "",
    },
  },
  "monthly_donation_cancellation.tsx": {
    file: {
      contents: "",
    },
  },
  "onetime_gold_donation.tsx": {
    file: {
      contents: "",
    },
  },
  "onetime_silver_donation.tsx": {
    file: {
      contents: "",
    },
  },
  "onetime_bronse_donation.tsx": {
    file: {
      contents: "",
    },
  },
  "newsletter_subscription.tsx": {
    file: {
      contents: "",
    },
  },
  "newsletter_cancellation.tsx": {
    file: {
      contents: "",
    },
  },
  "utils.ts": {
    file: {
      contents: "",
    },
  },
};

export const emailIds: TemplateId[] = [
  "monthly_donation_subscription",
  "monthly_donation_cancellation",
  "onetime_gold_donation",
  "onetime_silver_donation",
  "onetime_bronse_donation",
  "newsletter_subscription",
  "newsletter_cancellation",
];

export const writeTemplatesToFs = async (
  templates: TemplateSelector[],
  instance: WebContainer
) => {
  try {
    for (const item of templates) {
      if (item.templateId === "utils") {
        await instance.fs.writeFile(`${item.templateId}.ts`, item.file_content);
      } else {
        await instance.fs.writeFile(
          `${item.templateId}.tsx`,
          item.raw_jsx_content
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const ls = async (instance: WebContainer): Promise<DirEnt<string>[]> => {
  const ls = await instance.fs.readdir("/", {
    withFileTypes: true,
  });

  return ls;
};

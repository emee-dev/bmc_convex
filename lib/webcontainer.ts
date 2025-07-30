import { FileSystemTree, WebContainer } from "@webcontainer/api";

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

export const runScript = async (
  instance: WebContainer,
  script: "ssr.tsx"
): Promise<string> => {
  const installProcess = await instance.spawn("pnpm", ["tsx", script]);

  return new Promise((resolve) => {
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          resolve(data);
        },
      })
    );
  });
};

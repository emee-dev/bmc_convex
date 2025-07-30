import { useState, useCallback } from "react";
import type { WebContainer } from "@webcontainer/api";

type InstallStatus = "idle" | "installing" | "success" | "error";

type InstallResult = {
  installDeps: (instance: WebContainer) => Promise<void>;
  status: InstallStatus;
  error: string | null;
};

export const useInstallDependencies = (): InstallResult => {
  const [status, setStatus] = useState<InstallStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const installDeps = useCallback(async (instance: WebContainer) => {
    setStatus("installing");
    setError(null);

    try {
      const process = await instance.spawn("npm", ["install"]);
      const code = await process.exit;

      if (code !== 0) {
        throw new Error(`npm install failed with exit code ${code}`);
      }

      console.log("Done installing deps");
      setStatus("success");
    } catch (err: any) {
      setError(err?.message ?? "An unknown error occurred during install");
      setStatus("error");
    }
  }, []);

  return { installDeps, status, error };
};

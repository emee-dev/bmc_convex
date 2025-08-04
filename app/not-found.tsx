"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 text-muted-foreground space-y-4">
      <AlertTriangle className="h-10 w-10 text-red-500" />
      <h2 className="text-xl font-semibold">Page not found</h2>
      <p>
        We couldn't find the page you're looking for. It may have been removed
        or the link may be incorrect.
      </p>
      <Button
        onClick={reset}
        className="mt-2 inline-flex items-center px-4 py-2 border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors"
      >
        Try Again
      </Button>
    </div>
  );
}

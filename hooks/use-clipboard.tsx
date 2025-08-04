import { useCallback, useState, useEffect } from "react";

export function useClipboard(timeout: number = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setIsCopied(false);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCopied) {
      timer = setTimeout(() => setIsCopied(false), timeout);
    }
    return () => clearTimeout(timer);
  }, [isCopied, timeout]);

  return { isCopied, copy };
}

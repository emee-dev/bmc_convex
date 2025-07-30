import { useEffect, useRef, useState } from "react";
import type { WebContainer } from "@webcontainer/api"; // optional

export const useWebContainer = (
  timeoutMs: number,
  do_something: () => void
) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [webContainerRef, setWebContainerRef] = useState<WebContainer | null>(
    null
  );

  useEffect(() => {
    let sId: NodeJS.Timeout;
    let tId: NodeJS.Timeout;

    const checkAvailability = () => {
      if (webContainerRef) {
        clearTimeout(tId);
        clearInterval(sId);
        setIsLoaded(true);
      }
    };

    sId = setInterval(checkAvailability, 500);

    tId = setTimeout(() => {
      clearInterval(sId);
      if (webContainerRef) {
        do_something();
      }
    }, timeoutMs);

    return () => {
      clearInterval(sId);
      clearTimeout(tId);
    };
  }, [timeoutMs, do_something]);

  return {
    isLoaded,
    webContainerRef,
    setWebContainerRef,
  };
};

import { useEffect } from "react";

export const useSecretTrigger = (key: string, callback: () => void) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback]);
};

"use client";

import { useEffect, useState } from "react";

export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMswReady, setIsMswReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      if (
        process.env.NODE_ENV === "development" &&
        process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
      ) {
        const { worker } = await import("@/mocks/browser");
        await worker.start({
          onUnhandledRequest: "bypass",
        });
        console.log("🔥 [MSW] Client-side mocking enabled");
      }
      setIsMswReady(true);
    };

    initMSW();
  }, []);

  if (!isMswReady) {
    return null;
  }

  return <>{children}</>;
};

"use client";

import { Suspense, use } from "react";

import { handlers } from "@/mocks/handlers";

const mockingEnabledPromise =
  typeof window !== "undefined" && process.env.MOCKING_ENABLED === "true"
    ? import("@/mocks/browser").then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes("_next")) {
              return;
            }
            print.warning();
          },
        });
        worker.use(...handlers);

        console.info(worker.listHandlers());
      })
    : Promise.resolve();

export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <MockProviderWrapper>{children}</MockProviderWrapper>
    </Suspense>
  );
};

function MockProviderWrapper({ children }: { children: React.ReactNode }) {
  use(mockingEnabledPromise);
  return children;
}

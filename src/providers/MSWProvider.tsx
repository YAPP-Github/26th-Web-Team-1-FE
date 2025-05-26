"use client";

import { handlers } from "@/mocks/handlers";
import { Suspense, use } from "react";

const mockingEnabledPromise =
  typeof window !== "undefined"
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

        console.log(worker.listHandlers());
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

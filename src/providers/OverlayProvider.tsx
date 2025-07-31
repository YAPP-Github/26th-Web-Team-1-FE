"use client";

import { OverlayProvider as OverlayProviderKit } from "overlay-kit";

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  return <OverlayProviderKit>{children}</OverlayProviderKit>;
}

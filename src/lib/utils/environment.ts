export function isClient() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function isServer() {
  return !isClient();
}

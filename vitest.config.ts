import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules", "dist", "build", "public"],
    include: ["**/*.test.{ts,tsx}"],
    // TODO: setupFiles 설정
    coverage: {
      exclude: ["node_modules", "dist", "build", "public"],
      include: ["**/*.{ts,tsx}"],
    },
    passWithNoTests: true,
  },
});

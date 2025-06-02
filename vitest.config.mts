import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules", "dist", "build", "public"],
    include: ["**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      exclude: ["node_modules", "dist", "build", "public"],
      include: ["**/*.{ts,tsx}"],
    },
    passWithNoTests: true,
  },
});

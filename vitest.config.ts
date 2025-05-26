import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    workspace: [
      {
        extends: true,
        plugins: [],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            name: "chromium",
            provider: "playwright",
          },
        },
      },
    ],
  },
});

import type { StorybookConfig } from "@storybook/nextjs-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  staticDirs: ["../public"],
  async viteFinal(config) {
    return {
      ...config,
      plugins: [
        ...(config.plugins ?? []),
        svgr(),
        vanillaExtractPlugin(),
        tsconfigPaths(),
      ],
    };
  },
};
export default config;

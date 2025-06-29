import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  viteFinal: async config => {
    config.plugins = [
      ...(config.plugins || []),
      tsconfigPaths(),
      vanillaExtractPlugin(),
      svgr(),
    ];
    return config;
  },
};
export default config;

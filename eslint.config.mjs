import { FlatCompat } from "@eslint/eslintrc";
import vitest from "@vitest/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jestDom from "eslint-plugin-jest-dom";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import playwright from "eslint-plugin-playwright";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": "error",
      "no-empty": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "spaced-comment": [
        "error",
        "always",
        {
          line: {
            markers: ["/"],
            exceptions: ["-", "+"],
          },
          block: {
            markers: ["!"],
            exceptions: ["*"],
            balanced: true,
          },
        },
      ],
      "no-console": [
        "error",
        {
          allow: ["warn", "error", "info"],
        },
      ],
    },
  },
  {
    files: [
      "./src/**/*.test.{js,ts,jsx,tsx}",
      "./src/**/*.spec.{js,ts,jsx,tsx}",
    ],
    ...vitest.configs.recommended,
  },
  {
    files: [
      "./src/**/*.test.{js,ts,jsx,tsx}",
      "./src/**/*.spec.{js,ts,jsx,tsx}",
    ],
    ...jestDom.configs["flat/recommended"],
  },
  {
    files: [
      "./src/**/*.test.{js,ts,jsx,tsx}",
      "./src/**/*.spec.{js,ts,jsx,tsx}",
    ],
    ...testingLibrary.configs["flat/react"],
  },
  {
    files: ["./tests/**/*.ts", "./tests/**/*.tsx"],
    ...playwright.configs["flat/recommended"],
  },
  {
    plugins: {
      prettier: eslintConfigPrettier,
    },
    rules: {
      quotes: ["error", "double"],
    },
  },
];

export default eslintConfig;

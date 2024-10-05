import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  // Configuration for eslint.config.js
  {
    files: ["eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    },
  },
  // Configuration for TypeScript files
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["eslint.config.js"], // Exclude eslint.config.js from TypeScript rules
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    settings: {
      react: { version: "18.3" },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      prettierConfig,
    ],
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "prettier/prettier": ["error", {}, { usePrettierrc: true }],
      "react/prop-types": "off",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            { pattern: "react", group: "builtin", position: "before" },
            { pattern: "react-dom", group: "builtin", position: "before" },
            { pattern: "react-router-dom", group: "builtin", position: "before" },
            { pattern: "@/hooks/**", group: "internal", position: "after" },
            { pattern: "@/utils/**", group: "internal", position: "after" },
            { pattern: "@/constants/**", group: "internal", position: "after" },
            { pattern: "@/components/**", group: "internal", position: "after" },
            { pattern: "@/styles/**", group: "internal", position: "after" },
            { pattern: "./**/*.css", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["react", "react-router-dom"],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    },
  },
  // Configuration for config files
  {
    files: ["*.config.{js,ts}", "vite.config.{js,ts}"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
);

import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

const sharedRules = {
  // React rules
  ...reactHooks.configs.recommended.rules,
  ...react.configs.recommended.rules,
  ...react.configs["jsx-runtime"].rules,
  "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  "react/prop-types": "off",
  "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
  "react/jsx-props-no-spreading": "error",
  "react/no-unused-prop-types": "error",
  "react/require-default-props": "error",
  "react/no-array-index-key": "error",
  "react/no-danger": "error",
  "react/jsx-no-bind": ["error", { allowArrowFunctions: true }],
  "react/jsx-pascal-case": "error",
  "react/jsx-no-useless-fragment": "error",
  "react/function-component-definition": [
    "error",
    { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
  ],

  // TypeScript rules
  "@typescript-eslint/explicit-function-return-type": "off",
  "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  "@typescript-eslint/no-use-before-define": [
    "error",
    { functions: false, classes: true, variables: true },
  ],

  // General JavaScript rules
  "no-console": ["error", { allow: ["warn", "error"] }],
  "no-var": "error",
  "prefer-const": "error",
  "no-unused-expressions": "error",
  "no-param-reassign": ["error", { props: true }],
  "prefer-destructuring": ["error", { array: true, object: true }],
  "prefer-template": "error",
  "no-underscore-dangle": ["error", { allowAfterThis: true }],

  // Import rules
  "import/order": [
    "error",
    {
      groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
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

  // Prettier rules
  "prettier/prettier": ["error", {}, { usePrettierrc: true }],
};

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
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
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["eslint.config.js"],
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
        ecmaFeatures: {
          jsx: true,
        },
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
      react: { version: "detect" },
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
    rules: sharedRules,
  },
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

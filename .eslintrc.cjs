module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // You can add custom rules or override existing ones here
    "react/react-in-jsx-scope": "off", // Not needed in React 17+
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],
    "no-shadow": "off", // Turn off the base rule as it can report incorrect errors
    "@typescript-eslint/no-shadow": ["warn"], // Use the TypeScript-specific rule
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};

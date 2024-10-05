module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Add this line
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.app.json', './tsconfig.node.json'],
  },
  plugins: ['react', '@typescript-eslint', 'prettier'], // Add 'prettier' here
  rules: {
    // You can add custom rules or override existing ones here
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'no-shadow': 'off', // Turn off the base rule as it can report incorrect errors
    '@typescript-eslint/no-shadow': ['warn'], // Use the TypeScript-specific rule
    'prettier/prettier': 'error', // Add this line to show Prettier errors as ESLint errors
    'no-console': ['error'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.{ts,tsx}',
          '**/*.spec.{ts,tsx}',
          '**/vite.config.ts',
          '**/vitest.config.ts',
        ],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          { pattern: 'react', group: 'builtin', position: 'before' },
          { pattern: 'react-dom', group: 'builtin', position: 'before' },
          { pattern: 'react-router-dom', group: 'builtin', position: 'before' },
          { pattern: '@/hooks/**', group: 'internal', position: 'after' },
          { pattern: '@/utils/**', group: 'internal', position: 'after' },
          { pattern: '@/constants/**', group: 'internal', position: 'after' },
          { pattern: '@/components/**', group: 'internal', position: 'after' },
          { pattern: '@/styles/**', group: 'internal', position: 'after' },
          { pattern: './**/*.css', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-router-dom'],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['.eslintrc.cjs'],
};

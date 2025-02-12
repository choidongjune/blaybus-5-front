import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default {
  ignores: ["dist"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parser: tsParser,
    sourceType: "module",
  },
  plugins: {
    react: react,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "@typescript-eslint": tseslint,
  },
  extends: [
    js.configs.recommended,
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "@typescript-eslint/no-unused-vars": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

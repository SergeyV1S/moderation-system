import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      pluginQuery.configs["flat/recommended"],
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.recommended
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["off"],
      "react/prop-types": ["off"],
      "@typescript-eslint/no-unused-expressions": ["off"],
      "@typescript-eslint/no-non-null-assertion": ["off"],
      "no-undef": ["off"],
      "no-unused-vars": ["off"],
      "no-var": ["error"],
      "no-console": ["warn"],
      "no-shadow": ["error"],
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-empty-interface": ["off"],
      "@typescript-eslint/no-empty-function": ["off"],
      "arrow-body-style": ["error", "as-needed"],
      "@typescript-eslint/no-empty-object-type": ["off"],
      "react-hooks/exhaustive-deps": ["off"],
      "no-useless-catch": ["off"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports"
        }
      ],
      "no-restricted-imports": [
        "warn",
        {
          patterns: ["../../"]
        }
      ]
    }
  }
]);

import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        chrome: "readonly",
        window: "readonly",
        document: "readonly",
        Constants: "writeable",
      },
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
];

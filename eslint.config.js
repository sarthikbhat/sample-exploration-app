import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";

react.configs.recommended.plugins = { react }
react.configs.recommended.languageOptions = {
  parserOptions: react.configs.recommended.parserOptions
}

delete react.configs.recommended.parserOptions


/** @type {import('eslint').Linter.Config[]} */
export default [
  react.configs.recommended,
  {
    plugins: {
    react
    }
  },
  {
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    rules:{
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    }
  },
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  {plugins: {
    prettier: eslintPluginPrettier
  },},
  pluginJs.configs.recommended,
]
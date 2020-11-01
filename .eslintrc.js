module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "svelte3",//"i18next"
  ],
  overrides: [
    // NOTE: Svelte typescript eslint support is NYI
    /*{
      files: require("./svelte.config").extensions.map(extension => `*${extension}`),
      processor: "svelte3/svelte3",
    },*/
  ],
  extends: [
    // "plugin:i18next/recommended",
    "@tdi/base",
  ],
  rules: {
    "import/no-extraneous-dependencies": ["off"],
    "no-sequences": ["off"],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".json",
        ],
      },
    },
  },
} 
 
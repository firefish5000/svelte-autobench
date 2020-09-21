const tailwindcss = require("tailwindcss");

module.exports = {
  //parser: 'sugarss',
  plugins: [
    tailwindcss("./tailwind.config.js"),
    require('postcss-nested'),
    // :not(selector, .comma, list) -> :not(selector):not(.comma):not(list)
    require('postcss-selector-not'),
    /*require("cssnano")({
      preset: "default",
    }),*/
  ],
};

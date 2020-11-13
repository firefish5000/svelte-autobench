const {srcDir,extensions,createPreprocessors} = require("./svelte.config.js")

let packageJson = require('./package.json')

const dev = process.env.NODE_ENV === 'development'

module.exports = {
  mount: {
    public: '/',
    test: '/test',
    src: '/src',
  },
  plugins: [
    /*[
      '@snowpack/plugin-run-script',
      {
        cmd: `for DEP in $(cat package.json ` +
        ` | jq -r '.devDependencies | values[] ` + 
        `| select(contains("file")) | sub("^file:";"")'); ` + 
        ` do pushd "$\{DEP\}" && echo "Working in $\{DEP\}"` + 
        ` && npm run build; popd; done`, 
        output: 'stream'
      },
    ],*/
    ['@snowpack/plugin-svelte',{
      preprocess: createPreprocessors({sourceMap: true}),
      input: extensions,
    }],
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-postcss",
    ...(!dev ? [] : [[
      '@snowpack/plugin-run-script',
      {
        cmd: 'postcss public/tailwind.css -o public/build/global.css', 
        watch: '$1 -w', 
        output: 'stream'
      },
    ],
    [
      '@snowpack/plugin-run-script',
      {
        cmd: '_svelteCheck_=1 FORCE_COLOR=1 svelte-check --output human', 
        watch: process.env.NODE_ENV === 'development' ? '$1 --watch' : undefined,
        output: 'svelte-check'},
    ],
    ["@snowpack/plugin-run-script", {
      "cmd": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
      // Optional: Use npm package "watch" to run on every file change
      "watch": "_eslint_=1 FORCE_COLOR=1 watch \"$1\" src"
    }]])
  ],
};
const sveltePreprocess = require("svelte-preprocess")
const {mdsvex} = require("mdsvex")
const svelte = require('svelte/compiler');
const {asMarkupPreprocessor} = require('svelte-as-markup-preprocessor');
const { svelteTrim } = require("svelte-trim");

const createPreprocessors = ({sourceMap}={})=>{
  const preprocessors = [
    asMarkupPreprocessor(sveltePreprocess({
      sourceMap: sourceMap ?? false,
      typescript: true,
      postcss:true
    })),
    mdsvex(),
    svelteTrim({
      removalMethod: "trim",
      multiline: true,
      inline: false,
    })
  ]
  return asMarkupPreprocessor(preprocessors,svelteTrim({
    removalMethod: 'strip',
    inline: true,
    multiline: true,
    componentSiblings: true,
    elementSiblings: true,
    mustacheTextSiblings: false,
    mustacheBlockSiblings: true,
    mustacheDirectiveSiblings: true,
    //ignoreElements: ['code','pre'],
    /*ignoreFilter: (node)=>{
      return node.type==='DebugTag'
    }*/
  }))
}
module.exports={
  "createPreprocessors": createPreprocessors,
  "preprocess": createPreprocessors({sourceMap: true}),
  "extensions": [".svelte",".svx"],
  "outDir": "./preprocessed",
  "srcDir": "./src",
  "copyFileGlob": [
    "./src/**/*.js",
  ],
  "copyExcludeFileGlob": [
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/**/*.css",
    "./src/**/*.pcss",
  ] ,
}

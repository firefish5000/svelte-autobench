import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess';
import livereload from 'rollup-plugin-livereload';
import commonjs from '@rollup/plugin-commonjs';

import postcss from 'rollup-plugin-postcss'

import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());





const preprocess = [
  sveltePreprocess({
    sourceMap: dev,
    postcss: true,
    typescript: true,
  }),
]

export default {
  input: 'src/index.ts',
  output: [
    !dev && { file: pkg.module, 'format': 'es', sourcemap: dev },
    !dev && { file: pkg.main, 'format': 'umd', name, sourcemap: dev },
  ],
  plugins: [
    svelte({
      //emitCss: true,
      dev,
      extensions: ['.svelte', '.svx'],
      preprocess,
    }),
    typescript({sourceMap:dev}),
    postcss({
			sourceMap: true
		}),
    resolve(),
    commonjs(),
  ],
};

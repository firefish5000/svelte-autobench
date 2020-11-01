import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());


import {preprocessors as preprocess, extensions} from './svelte-preprocess.config'

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
      extensions,
      preprocess,
    }),
    resolve(),
    commonjs(),
  ],
};

const path = require('path')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const json = require('@rollup/plugin-json')

/**
 * @type {import('rollup').RollupOptions}
 */
const rollupConfig = {
  input: path.resolve(__dirname, 'src/index.js'),
  output: [
    {
      dir: path.resolve(__dirname, 'dist'), // 目录名
      format: 'iife', // 打包后格式
      entryFileNames: '[name].js', // 入口打包后名称
      sourcemap: true,
      name: '$gen',
    },
  ],
  plugins: [
    json(),
    commonjs(),
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json', '.ts'],
    }),
    terser(),
  ],
}

module.exports = rollupConfig

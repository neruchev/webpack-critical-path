import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';

import { optimization, resolve, rules } from './params';

export default {
  target: 'web',
  entry: './src/client.tsx',
  mode: 'production',
  module: {
    rules: [rules.typescript, rules.pcss],
  },
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, '..', 'static'),
  },
  plugins: [new ExtractTextPlugin('styles.css')],
  resolve,
  optimization,
};

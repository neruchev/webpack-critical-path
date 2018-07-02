import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';

import { ROUTES } from '../src/constants/routes';
import { optimization, resolve, rules } from './params';
import { WebpackCriticalPathPlugin } from './WebpackCriticalPathPlugin';

const cssFilename = '../static/styles.css';

export default {
  target: 'node',
  entry: './src/server.tsx',
  mode: 'production',
  module: {
    rules: [rules.typescript, rules.pcss],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  plugins: [
    new WebpackCriticalPathPlugin({
      width: 1024,
      height: 768,
      host: 'http://localhost',
      port: 8000,
      timeout: 30000,
      urls: Object.values(ROUTES),
      cssFilename,
    }),
    new ExtractTextPlugin(cssFilename),
  ],
  resolve,
  optimization,
};

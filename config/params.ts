import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';

export const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
  alias: {
    src: path.resolve(__dirname, '..', 'src'),
  },
};

export const optimization = {
  minimize: true,
  nodeEnv: 'production',
  removeAvailableModules: true,
};

export const rules = {
  typescript: {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: 'ts-loader',
  },
  pcss: {
    test: /\.pcss$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            minimize: true,
            modules: true,
            localIdentName: '[sha512:hash:base64:5]',
          },
        },
        {
          loader: 'postcss-loader',
        },
      ],
      publicPath: path.resolve(__dirname, '..', 'static'),
    }),
  },
};

import * as path from 'path';
import * as webpack from 'webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV as 'development' | 'production';

const __DEVELOPMENT__ = NODE_ENV === 'development';

const getPlugins = () => {
  const plugins: webpack.Configuration['plugins'] = [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: __DEVELOPMENT__,
      __DEVTOOLS__: __DEVELOPMENT__,
      PUBLIC_PATH: JSON.stringify(process.env.PUBLIC_PATH),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.hbs'),
      publicPath: '/',
      DEVELOPMENT: __DEVELOPMENT__,
    }),
  ];
  
  if (false) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static'
      }),
    );
  }

  return plugins;
};

const config: webpack.Configuration = {
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    './src/index',
  ],
  mode: __DEVELOPMENT__ ? 'development' : 'production',
  devtool: __DEVELOPMENT__ ? 'eval' : undefined,
  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true,
    noInfo: true,
    quiet: false,
    inline: true,
    lazy: false,
    public: '',
    host: '0.0.0.0',
  },
  context: path.resolve(__dirname),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: __DEVELOPMENT__ ? '/' : './',
    filename: __DEVELOPMENT__ ? 'app.[name].js' : 'app.[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // remove targets
                    corejs: { version: 3, proposals: true },
                    useBuiltIns: 'usage', // 'usage' те функции, которые используются
                    configPath: path.join(__dirname),
                  },
                ],
                '@babel/preset-typescript',
              ],
              plugins: [
                [
                  '@babel/plugin-proposal-optional-chaining',
                  {
                    loose: true,
                  }
                ],
                [
                  '@babel/plugin-proposal-class-properties',
                  {
                    loose: true,
                  },
                ],
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [
      '.json',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    modules: [__dirname, 'src', 'node_modules'],
  },
  plugins: getPlugins(),
  optimization: {
    noEmitOnErrors: true,
  },
};

module.exports = config;

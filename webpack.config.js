require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;
const { MFLiveReloadPlugin } = require('@module-federation/fmr');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const federationConfig = require('./module-federation/federation-config');

module.exports = (env) => {
  return {
    entry: env.development ? './src/playground.tsx' : './src/index.tsx',
    ...(!env.development ? {} : { devtool: 'eval-source-map' }),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
    },
    // resolve: {
    //   extensions: ['.ts', '.tsx', '.js', '.scss'],
    //   plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    // },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          },
          exclude: /dist/
        },
        {
          // @TODO different loaders for react & common
          test: /\.svg$/,
          use: ['@svgr/webpack']
        }
      ]
    },
    devServer: {
      port: 4001,
      open: true,
      historyApiFallback: false,
      hot: true
    },
    plugins: [
      // new ModuleFederationPlugin(federationConfig),
      new FederatedTypesPlugin({ federationConfig }),
      ...(env.development
        ? [
            new MFLiveReloadPlugin({
              port: 4001, // the port your app runs on
              container: 'kc_components', // the name of your app, must be unique
              standalone: true // false uses chrome extention
            })
          ]
        : []),
      // new MiniCssExtractPlugin({
      //   filename: env.development ? '[name].css' : '[name].[hash].css',
      //   chunkFilename: env.development ? '[id].css' : '[id].[hash].css'
      // }),
      new HtmlWebpackPlugin({
        // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
        template: './public/index.html',
        excludeChunks: ['kc_components'] // <-- seems to break HMR if this isn't here
      })
      // new ForkTsCheckerWebpackPlugin({
      //   // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
      // }),
      // new EnvironmentPlugin(['ASSET_PATH']),
    ],
    infrastructureLogging: {
      level: 'log'
    }
  };
};

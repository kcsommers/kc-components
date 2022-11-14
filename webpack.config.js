require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;
const deps = require('./package.json').dependencies;
const { MFLiveReloadPlugin } = require('@module-federation/fmr');

module.exports = (env) => {
  return {
    entry: env.development ? './src/playground.tsx' : './src/index.tsx',
    ...(!env.development ? {} : { devtool: 'eval-source-map' }),
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
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
          test: /\.module\.s(a|c)ss$/,
          use: [
            env.development ? 'style-loader' : MiniCssExtractPlugin.loader, // append to dom : externalize css
            {
              loader: 'css-loader', // process @import, url()
              options: {
                modules: true,
                sourceMap: env.development
              }
            },
            'postcss-loader',
            {
              loader: 'sass-loader', // scss to css
              options: {
                sourceMap: env.development
              }
            }
          ]
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            env.development ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: env.development
              }
            }
          ]
        }
      ]
    },
    devServer: {
      port: 4000,
      open: true,
      historyApiFallback: true,
      hot: true
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'kc_components',
        filename: 'kc-components-remoteEntry.js',
        remotes: {},
        exposes: {
          './ui/Button': {
            import: './src/react/ui/Button/Button',
            name: 'button'
          },
          './ui/Form': {
            import: './src/react/ui/Form/Form',
            name: 'form'
          },
          './ui/Input': {
            import: './src/react/ui/Input/Input',
            name: 'input'
          },
          './ui/LoadingSpinner': {
            import: './src/react/ui/LoadingSpinner/LoadingSpinner',
            name: 'loading-spinner'
          },
          './ui/Navbar': {
            import: './src/react/ui/Navbar/Navbar',
            name: 'navbar'
          },
          './ui/Layout': {
            import: './src/react/ui/Layout/Layout',
            name: 'layout'
          },
          './utils': './src/common/utils/index',
          './theme': {
            import: ['./src/react/design/theme/index'],
            name: 'theme'
          },
          './design': {
            import: './src/common/design/index',
            name: 'design'
          },
          './global-styles': {
            import: './src/common/design/styles/base-styles/base-styles.scss',
            name: 'global-styles'
          }
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom']
          }
        }
      }),
      new MFLiveReloadPlugin({
        port: 4000, // the port your app runs on
        container: 'kc_components', // the name of your app, must be unique
        standalone: true // false uses chrome extention
      }),
      new MiniCssExtractPlugin({
        filename: env.development ? '[name].css' : '[name].[hash].css',
        chunkFilename: env.development ? '[id].css' : '[id].[hash].css'
      }),
      new HtmlWebpackPlugin({
        // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
        template: './public/index.html',
        excludeChunks: ['kc_components'] // <-- seems to break HMR if this isn't here
      })
      // new ForkTsCheckerWebpackPlugin({
      //   // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
      // }),
      // new EnvironmentPlugin(['ASSET_PATH']),
    ]
  };
};

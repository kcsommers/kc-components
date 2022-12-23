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
      extensions: ['.ts', '.tsx', '.js', '.scss'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
    },
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
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {
          './react/ui/Button': {
            import: './src/react/ui/Button/Button',
            name: 'button'
          },
          './react/ui/Form': {
            import: './src/react/ui/Form/Form',
            name: 'form'
          },
          './react/ui/Input': {
            import: './src/react/ui/Input/Input',
            name: 'input'
          },
          './react/ui/ImageCrossfader': {
            import: './src/react/ui/ImageCrossfader/ImageCrossfader',
            name: 'image-crossfader'
          },
          './react/ui/LoadingSpinner': {
            import: './src/react/ui/LoadingSpinner/LoadingSpinner',
            name: 'loading-spinner'
          },
          './react/ui/Navbar': {
            import: './src/react/ui/Navbar/Navbar',
            name: 'navbar'
          },
          './react/ui/Layout': {
            import: './src/react/ui/Layout/Layout',
            name: 'layout'
          },
          './common/utils': {
            import: './src/common/utils/index',
            name: 'common-utils'
          },
          './common/utils/dates/date-utils': {
            import: './src/common/utils/dates/date-utils',
            name: 'date-utils'
          },
          './common/utils/display/commafy-number': {
            import: './src/common/utils/display/commafy-number',
            name: 'commafy-number'
          },
          './common/utils/display/get-dollar-string': {
            import: './src/common/utils/display/get-dollar-string',
            name: 'get-dollar-string'
          },
          './common/utils/regex': {
            import: './src/common/utils/regex/index',
            name: 'common-regex'
          },
          './react/theme': {
            import: ['./src/react/design/theme/index'],
            name: 'theme'
          },
          './common/design': {
            import: './src/common/design/index',
            name: 'common-design'
          },
          './common/global-styles': {
            import: './src/common/design/styles/base-styles.scss',
            name: 'global-styles'
          },
          './react/utils/hooks/use-interval': {
            import: './src/react/utils/hooks/use-interval',
            name: 'use-interval'
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

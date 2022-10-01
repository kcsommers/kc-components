require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;
const deps = require('./package.json').dependencies;

module.exports = (env) => {
  return {
    entry: env.development ? './src/playground.tsx' : './src/index.tsx',
    ...(!env.development ? {} : { devtool: 'eval-source-map' }),

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    output: {
      publicPath: process.env.ASSET_PATH || '/',
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
          exclude: /dist/,
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            env.development ? 'style-loader' : MiniCssExtractPlugin.loader, // append to dom : externalize css
            {
              loader: 'css-loader', // process @import, url()
              options: {
                modules: true,
                sourceMap: env.development,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader', // scss to css
              options: {
                sourceMap: env.development,
              },
            },
          ],
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
                sourceMap: env.development,
              },
            },
          ],
        },
      ],
    },
    devServer: {
      port: 4000,
      open: true,
      historyApiFallback: true,
      hot: true,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'components',
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {
          './ui/Button': './src/react/ui/Button/Button.tsx',
          './ui/Form': './src/react/ui/Form/Form.tsx',
          './ui/Input': './src/react/ui/Input/Input.tsx',
          './ui/LoadingSpinner':
            './src/react/ui/LoadingSpinner/LoadingSpinner.tsx',
          './ui/Navbar': './src/react/ui/Navbar/Navbar.tsx',
          './hooks/use-keydown': './src/react/hooks/use-keydown.tsx',
          '/providers/base-theme': './src/react/providers/base-theme/index.ts',
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
      new MiniCssExtractPlugin({
        filename: env.development ? '[name].css' : '[name].[hash].css',
        chunkFilename: env.development ? '[id].css' : '[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
        template: './index.html',
        excludeChunks: ['components'],
      }),
      new ForkTsCheckerWebpackPlugin({
        // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
        typescript: {
          memoryLimit: 4096,
        },
      }),
      new EnvironmentPlugin(['ASSET_PATH']),
    ],
  };
};

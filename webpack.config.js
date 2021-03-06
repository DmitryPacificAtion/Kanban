const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Tip: Try to use without destructuring, if node -v less then 10
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  let config = {};
  if (argv.mode === 'development') {
    config = {
      mode: 'development',
      entry: {
        app: './src/index.js',
      },
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      },
      module: {
        rules: [
          {
            test: /\.js?$/,
            exclude: '/node_modules/',
            use: ['babel-loader'],
          },
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'sass-loader',
              },
              { loader: 'required-loader' },
            ],
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader'],
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.json', '.css', '.sass'],
      },
      devtool: 'inline-source-map',
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'Not Trello',
          filename: 'index.html',
          template: './src/index.html',
          inject: 'body',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          ignoreOrder: false,
        }),
      ],
      devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: '3000',
        historyApiFallback: true,
        hot: true,
        open: true,
      },
    };
  } else {
    config = {
      mode: 'production',
      entry: {
        app: './src/index.js',
      },
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      },
      module: {
        rules: [
          {
            test: /\.js?$/,
            exclude: '/node_modules/',
            use: ['babel-loader'],
          },
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'sass-loader',
              },
              { loader: 'required-loader' },
            ],
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader'],
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.json', '.css', '.sass'],
      },
      devtool: 'inline-source-map',
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'Not Trello',
          filename: 'index.html',
          template: './src/index.html',
          inject: 'body',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          ignoreOrder: false,
        }),
        new ImageminPlugin({
          // disable: process.env.NODE_ENV !== 'production', // Disable during development
          pngquant: {
            quality: '80-90'
          }
        })
      ],
    };
  }
  return config;
};

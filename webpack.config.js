const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {


  let destinationPath = 'bundle/dev';
  let fileNameStructure = '[name]';

  // Cambiamos la ruta en caso sea producción
  if (options.mode === 'production') {
    destinationPath = 'docs';
    fileNameStructure = '[name].min';
  }

  // config
  return {
    resolve: {
      alias: {
        'modules': path.resolve(__dirname, './source/modules/'),
      },
      //modules: [path.resolve(__dirname, './source/modules'), 'node_modules'],
      extensions: ['.jsx', '.js', '.json']
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'bundle'),
      compress: true,
      writeToDisk: true,
      port: 9000,
      https: true,
      disableHostCheck: true,
      open: true
    },
    entry: {
      'index': './source/index.js'
    },
    output: {
      path: path.resolve(__dirname, destinationPath),
      filename: fileNameStructure + '.js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: fileNameStructure + '.css'
      }),
      new HtmlWebpackPlugin({
        title: 'PWA Demo',
        template: './source/index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: false
        }
      }),
      new CopyWebpackPlugin([{
        from: './source/assets/images',
        to: path.resolve(__dirname, destinationPath) + '/assets/images'
      }])
    ],
    externals: {
      CONFIG: 'CONFIG',
      Global: 'Global'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin(),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-export-default-from']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader", options: { sourceMap: true }
            },
            {
              loader: "sass-loader", options: {
                sourceMap: true,
                includePaths: [
                  path.join(__dirname, 'src')
                ]
              }
            }
          ]
        },
        {
          test: /\.json?$/,
          use: 'json-loader'
        }
      ]
    }
  }


};

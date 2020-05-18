const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');
// const copyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // 压缩 JS
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');
const postcssPlugins = require('../postcss.config.js');
const config = require('../config/config.js');
const glob = require('glob');
const ImageminPlugin = require('imagemin-webpack-plugin').default

const htmlPlugins = [];
const htmlFiles = glob.sync(
  path.resolve(
    __dirname,
    `../src/page/${config.CURRENT_PROJECT}/views/**/*.html`
  )
);

htmlFiles.forEach(item => {
  const matchHtml = item.match(/\/views\/(.*)\/(.*).html/);
  const keyDir = matchHtml && matchHtml[1];
  const keyHtml = matchHtml && matchHtml[2];
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      template: `./src/page/${config.CURRENT_PROJECT}/views/${keyDir}/${keyHtml}.html`,
      chunks: [keyDir, 'vendors', 'runtime'],
      filename: `${keyDir}.html`
    })
  );
});

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.pc.scss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2
                }
              },
              // 'postcss-loader'
              {
                loader: 'postcss-loader',
                options: {
                  plugins: postcssPlugins(true)
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  publicPath: ''
                }
              }
            ]
          },
          {
            test: /\.pc.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              // 'postcss-loader'
              {
                loader: 'postcss-loader',
                options: {
                  plugins: postcssPlugins(true)
                }
              }
            ]
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2
                }
              },
              // 'postcss-loader'
              {
                loader: 'postcss-loader',
                options: {
                  plugins: postcssPlugins()
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  publicPath: ''
                }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              // 'postcss-loader'
              {
                loader: 'postcss-loader',
                options: {
                  plugins: postcssPlugins()
                }
              }
            ]
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      // webpack 不支持es6语法的压缩，要需要babel配合一下
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: false,
        terserOptions: {
          drop_console: true,  // 剔除所有console.log
          drop_debugger: true  // 剔除所有debugger
        }
      }) // 压缩 js
    ]
  },
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css'
    }),
    new ImageminPlugin({ 
      test: /.(jpe?g|png|gif|svg)$/i,
      disable: !config.IMAGE_COMPRESS,
      pngquant: {
        quality: '95-100'
      }
    }),
  ],
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js'
  }
};

module.exports = merge(commonConfig, prodConfig);

const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const config = require('../config/config.js');
const Dashboard = require('webpack-dashboard');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const dashboard = new Dashboard();
const postcssPlugins = require('../postcss.config.js');
const glob = require('glob');
const path = require('path');

const htmlPlugins = [ ];
const htmlFiles = glob.sync(path.resolve(__dirname, `../src/page/${config.CURRENT_PROJECT}/views/**/*.html`));


htmlFiles.forEach((item) => {
	const matchHtml = item.match(/\/views\/(.*)\/(.*).html/);
	const keyDir = matchHtml && matchHtml[1];
	const keyHtml = matchHtml && matchHtml[2];
	htmlPlugins.push(new HtmlWebpackPlugin({
		template: `./src/page/${config.CURRENT_PROJECT}/views/${keyDir}/${keyHtml}.html`,
		chunks: [keyDir, 'vendors', 'runtime', 'default'],
		filename: `${keyDir}.html`
	}))
})

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    // open: true,
    host: '0.0.0.0',
    port: config.PORT,
    hot: true,
    proxy: config.PROXY || {},
    quiet: true
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.pc.scss$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2
                }
              },
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
              'style-loader',
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
                loader: 'style-loader'
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
              'style-loader',
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
  plugins: [
    ...htmlPlugins,
    new webpack.HotModuleReplacementPlugin(), 
    // new DashboardPlugin(dashboard.setData),
    
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  }
};

module.exports = merge(commonConfig, devConfig);

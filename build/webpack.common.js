const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('../config/config.js');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const glob = require('glob');

// console.log(process.env);

const PATH_SRC = path.resolve(__dirname, `../src/`);

const entryConfig = {};
const jsFiles = glob.sync(
  path.resolve(PATH_SRC, `./page/${config.CURRENT_PROJECT}/views/**/*.?[js|ts]`)
);

jsFiles.forEach(item => {
  const matchDir = item.match(/\/views\/(.*)\/.*.[js|ts]/);
  const keyDir = matchDir && matchDir[1];
  entryConfig[keyDir] = item;
});

module.exports = {
  entry: entryConfig,
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader', //ts加载器
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/]
        } //认识vue文件
      },
      {
        oneOf: [
          {
            test: /ban64(\w){0,}.(jpg|png|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name]_[hash].[ext]',
                  outputPath: 'images/'
                }
              }
            ],
          },
          {
            test: /\.(jpg|png|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: '[name]_[hash].[ext]',
                  outputPath: 'images/',
                  limit: 1024 * 10 
                }
              }
            ],
          },
        ]
      }
    ]
  },
  resolve: {
    // 设置别名
    alias: {
      '@': PATH_SRC,
      src: PATH_SRC,
      page: path.resolve(PATH_SRC, './page'),
      common: path.resolve(PATH_SRC, './common'),
      assets: path.resolve(PATH_SRC, `./page/${config.CURRENT_PROJECT}/assets`),
      components: path.resolve(
        PATH_SRC,
        `./page/${config.CURRENT_PROJECT}/components`
      )
    },
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.jsx',
      '.vue',
      '.css',
      '.less',
      '.scss',
      '.png',
      '.jpg',
      '.jpeg',
      '.ico',
      '.swf',
      '.svg'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'default'
        }
      }
    }
  },
  performance: false,
  output: {
    path: path.resolve(__dirname, '../dist/' + config.CURRENT_PROJECT)
  }
};

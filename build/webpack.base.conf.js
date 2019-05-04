const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpackDevConf = require('./webpack.dev.conf');
const webpackProdConf = require('./webpack.prod.conf');
const merge = require('webpack-merge');


const generateConfig = env => {

  const cssLoader = [
    'style-loader',
    'css-loader',
    'sass-loader',
    'postcss-loader'
  ];

  const productionCssLoader = [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    'sass-loader',
    'postcss-loader'
  ]

  return {
    entry: {
      app: './src/index.tsx'
    },

    output: {
      publicPath: env === 'development' ? '/' : './',
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[hash:8].js',
      chunkFilename: '[name].[hash:8].chunk.js'
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: env === 'development' ? cssLoader : productionCssLoader
        },
        {
          test: /\.(eot|woff2?|ttf|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/'
            }
          }]
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name]-[hash:5].min.[ext]',
                limit: 10000, // size <= 10KB
                outputPath: 'images/'
              }
            },
            // 图片压缩
            {
              loader: 'image-webpack-loader',
              options: {
                // 压缩 jpg/jpeg 图片
                mozjpeg: {
                  progressive: true,
                  quality: 50 // 压缩率
                },
                // 压缩 png 图片
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          ]
        }
      ]
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.json', '.js', 'jsx'],
      alias: {
      '@': path.resolve(__dirname, './src')
      }
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'index.html'),
        filename: 'index.html',
        minify: {
          collapseWhitespace: true
        },
        inject: true
      }),
      new CleanWebpackPlugin(),
      new MonacoWebpackPlugin()
    ]
  }
}

module.exports = env => {
  let config = env === 'production' ? webpackProdConf : webpackDevConf;
  return merge(generateConfig(env), config);
}

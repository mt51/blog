const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'souce-map',
  devServer: {
    open: true,
    port: 8080,
    hot: true,
    overlay: true,
    proxy: {},
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedChunksPlugin()
  ]
}
const paths = require('./paths');

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    //open: true,
    compress: true,
    hot: true,
    port: 8888,
    overlay: {
      warnings: true,
      errors: true,
    },
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});

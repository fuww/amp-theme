const path = require('path');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _StyleLintPlugin = require('stylelint-webpack-plugin');

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: './layouts/partials/stylesheet.html',
  // chunkFilename: '[id].css'
});
const StyleLintPlugin = new _StyleLintPlugin({
  configFile: path.resolve(__dirname, 'stylelint.config.js'),
  context: path.resolve(__dirname, '../assets/styles'),
  files: '**/*.css',
  failOnError: false,
  quiet: false,
  fix: true,
});
module.exports = {
  MiniCssExtractPlugin,
  StyleLintPlugin,
};

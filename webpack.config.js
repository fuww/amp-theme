const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssNano = require('cssnano');
const plugins = require('./webpack/plugins');

module.exports = {
  entry: {
    main: ['./assets/styles/styles.scss'],
    fu: './assets/styles/fu.scss',
    marketplace: './assets/styles/marketplace.scss',
  },
  output: {
    path: path.join(__dirname, './'),
    filename: './assets/compiled/[name].js',
  },
  performance: {
    hints: 'error',
    maxEntrypointSize: 750000,
    maxAssetSize: 300000,
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
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /stylesheet\.html$/g,
        cssProcessor: CssNano,
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }], // for cssnano
        },
      }),
    ],
  },
  plugins: [
    plugins.StyleLintPlugin,
    new MiniCssExtractPlugin({
      filename: './layouts/partials/[name]-stylesheet.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.((eot)|(woff)|(woff2)|(ttf))(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=[hash].[ext]',
        options: {
          name: '[name].[ext]', // [path]/
          outputPath: './assets/compiled/fonts/',
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1, 
            // sourceMap: true 
          } },
          {
            loader: 'postcss-loader?sourceMap',
            options: { config: { path: './' } },
          },
          {
            loader: 'sass-loader',
            options: { // Prefer `dart-sass`
            implementation: require('sass'),
            includePaths: ['node_modules'],
            // sourceMap: true, 
          },
          },
        ],
      },
      {
        test: /.(gif|jpe?g|png|svg|tiff|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: './assets/compiled/img/[name].[hash:4].[ext]' },
          },
        ],
      },
    ],
  },
};

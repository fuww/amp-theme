const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CssNano = require('cssnano');
const StylelintPlugin = require('stylelint-webpack-plugin');


module.exports = {
  devtool: "source-map",
  entry: {
    main: './assets/styles/styles.scss', // conflicting order when used with fu
    fu: './assets/styles/fu.scss',
    marketplace: './assets/styles/marketplace.scss',
  },
  output: {
    path: path.join(__dirname, './'),
    filename: './assets/compiled/[name].js',
  },
  performance: {
    hints: 'error',
    maxEntrypointSize: 600000, // 50 is the old, 75 is the new limit for AMP
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
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
        include: /stylesheet\.html$/g,
      }),
    ],
  },
  plugins: [
    new StylelintPlugin({
        configFile: path.resolve(__dirname, 'stylelint.config.js'),
        context: path.resolve(__dirname, '../assets/styles'),
        files: '**/*.css',
        failOnError: false,
        quiet: false,
        fix: true,
      }),
    new MiniCssExtractPlugin({
      filename: './layouts/partials/[name]-stylesheet.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.((eot)|(woff)|(woff2)|(ttf))(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
        loader: 'file-loader?name=[hash].[ext]',
        options: {
          name: '[name].[ext]', // [path]/
          outputPath: './assets/compiled/fonts/',
        },
      },
    ]
      },
      {
        test: /\.(s(a|c)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          { loader: "css-loader", 
            options: { 
              importLoaders: 1,
              sourceMap: true 
          } 
        },
          // Processes CSS with PostCSS.
           {
            loader: 'postcss-loader?sourceMap',
            options: { 
              config: { path: './' },
              sourceMap: true 
            },
          },
          // Compiles Sass to CSS
          { loader: "sass-loader", 
            options: { 
              // Prefer `dart-sass`
              implementation: require('sass'),
              // includePaths: ['node_modules'],
              sourceMap: true 
          } 
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

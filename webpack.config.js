const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');

// const devMode = process.env.NODE_ENV !== 'production';
// const CleanCss = require('clean-css');
const CssNano = require('cssnano');
const plugins = require('./webpack/plugins');

module.exports = {
  entry: {
    main: ['./assets/src/styles/amp/theme.scss'],
  },
  output: {
    path: path.join(__dirname, './'),
    // publicPath: '/',
    filename: './assets/compiled/[name].js',
  },
  performance: {
    hints: 'error',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
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
        // cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({
        // assetNameRegExp: /\.css$/g,
        // assetNameRegExp: /\.html$/g,
        assetNameRegExp: /stylesheet\.html$/g,
        // cssProcessor: CleanCss,
        cssProcessor: CssNano,
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }], // for cssnano
          // preset: ['default', { level: 2 }], // for CleanCSS
          // options: {
          //   compatibility: "ie9",
          //   level: 2,
          //   inline: ["remote"]
          // }
        },
      }),
    ],
  },
  plugins: [
    plugins.StyleLintPlugin,
    // new CleanWebpackPlugin(['static/fonts', 'assets/compiled']),  // Use ONLY for production builds!
    new MiniCssExtractPlugin({
      filename: './layouts/partials/stylesheet.html',
      // filename: "./assets/compiled/[name].css"
      // Must use manifest for this:
      // filename: devMode ? '[name].css' : '[name].[contenthash].css',
    }),
    // fonts are now duplicate in assets & static folder,
    // Webpack checks them from the CSS, so not in assets = error
    // Hugo doesn't copy the files, so not in static = no fonts in frontend
    // Could not yet get this solution to work: https://discourse.gohugo.io/t/solved-assets-and-fonts/13797/7
    // new CopyWebpackPlugin([
    //   {
    //     from: 'assets/fonts/',
    //     to: 'static/fonts',
    //   },
    // ]),
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
      // {
      //   test: /^\.\/js\/.*\.js?$/,
      //   use: ["babel-loader"]
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        // test: /\.scss$/,
        use: [
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          // { loader: 'postcss-loader?sourceMap', options: { config: { path: '../' } } },
          {
            loader: 'postcss-loader?sourceMap',
            options: { config: { path: './' } },
          },
          {
            loader: 'sass-loader',
            options: { includePaths: ['node_modules'] },
          },
        ],

        // use: ['style-loader',
        //   { loader: MiniCssExtractPlugin.loader, },
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       importLoaders: 1
        //     }
        //   },
        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       config: {
        //         path: '../'
        //       }
        //     }
        //   //   options: {
        //   //     plugins: () => [autoprefixer()]
        //   //  }
        //   },
        //   {
        //     loader: 'sass-loader',
        //     options: { includePaths: ['node_modules'] }
        //   }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /.(gif|jpe?g|png|svg|tiff|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'img/[name].[hash:4].[ext]' },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // @see https://github.com/imagemin/imagemin-gifsicle#api
              gifsicle: {
                interlaced: true,
                optimizationLevel: 3,
              },

              // @see https://github.com/imagemin/imagemin-mozjpeg#api
              mozjpeg: {
                quality: 75,
              },

              // @see https://github.com/imagemin/imagemin-pngquant#api
              pngquant: {
                quality: '65-85',
                speed: 1,
              },

              // @see https://github.com/imagemin/imagemin-svgo#api
              svgo: {
                plugins: [{ removeViewBox: true }],
              },
            },
            // @see https://github.com/imagemin/imagemin-webp#api
            // webp: {
            //   quality: 75,
            //   method: 6
            // })
          },
          // 'sharp-image-loader'
        ],
      },
    ],
  },
};

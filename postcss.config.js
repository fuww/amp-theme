module.exports = {
  // parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions',
    },
    'postcss-custom-media': {},
    'postcss-custom-properties': {},
    // 'postcss-calc': {},
    // 'autoprefixer': {},
    'clean-css': {},
  },
};

// var postcss = require('postcss')

// module.exports = {
//     use: [
//         'postcss-import',
//         'postcss-custom-media',
//         'postcss-custom-properties',
//         'postcss-calc',
//         'postcss-color-function',
//         'postcss-discard-comments',
//         'autoprefixer',
//         'postcss-clean',
//     ],
//     // input: 'src/base.css',
//     // dir: 'css'
// };

// module.exports = {
//     plugins: {
//         autoprefixer: {
//             browsers: [
//                 "last 2 versions",
//                 "Explorer >= 8",
//             ]
//         }
//     },
// }

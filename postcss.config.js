module.exports = {
  // parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions',
    },
    'postcss-custom-media': {},
    'postcss-custom-properties': {
      // preserve: true // for debugging only, adds ~10kb to CSS
    },
    // 'postcss-calc': {},
    'autoprefixer': {},
    'clean-css': {},
  },
};

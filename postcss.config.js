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

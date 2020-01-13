export default {
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

  // @see https://github.com/imagemin/imagemin-webp#api
  // webp: {
  //   quality: 75,
  //   method: 6
  // }
};

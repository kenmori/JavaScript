module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: [
        "ie 11",
      ],
      autoprefixer: { grid: true }
    },
    'cssnano': {}
  }
}

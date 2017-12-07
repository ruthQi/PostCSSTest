module.exports = {
   plugins: [
      require('cssnext'),
      require('precss'),
      require('postcss-color-rgba-fallback'),
      require('postcss-opacity'),
      require('postcss-pseudoelements'),
      require('postcss-vmin'),
      require('pixrem'),
      require('postcss-will-change'),
      require('autoprefixer')
  ]
}
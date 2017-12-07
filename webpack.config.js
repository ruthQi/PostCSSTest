var path = require('path');

module.exports = {
   // entry: '../script/index.js',
   output: {
      // path: __dirname,
      filename: '[name].js'
   },
   module: {
      loaders: [
         /*{ test: /\.css$/, loader: 'style!css' },*/
         {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [{
               loader: 'style-loader'
            }, {
               loader: 'css-loader'
            }, {
               loader: 'postcss-loader',
               options: {
                  config: {
                     path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                  }
               }
            }/*, {
               loader: 'sass-loader'
            }*/]
         }/*,
         {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
               cacheDirectory: true,
               presets: [
                  ['es2015', {
                     'loose': true,
                     'modules': false
                  }],
                  'babel-preset-stage-0'
               ]
            }
         }*/
      ]
   }
};
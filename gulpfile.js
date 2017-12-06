'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnext = require('cssnext');
const precss = require('precss');
const color_rgba_fallback = require('postcss-color-rgba-fallback');
const opacity = require('postcss-opacity'); 
const pseudoelements = require('postcss-pseudoelements'); 
const vmin = require('postcss-vmin'); 
const pixrem = require('pixrem'); 
const will_change = require('postcss-will-change');


var del = require('del');

var watch = require('gulp-watch');
var connect = require('gulp-connect');
var webpack = require('webpack-stream');
var named = require('vinyl-named');

var server = require('gulp-express');


//此处需要执行npm install postcss-advanced-variables --save-dev，否则使用gulp css报错
gulp.task('css', function(){
   //使用的插件
   var processors = [
      autoprefixer,
      cssnext,
      precss
   ];
   var processors1 = [
      //autoprefixer({browsers: 'safari >= 9,ie >= 11'}),//只有设置的浏览器才会编译
      color_rgba_fallback,
      opacity,
      pseudoelements,
      vmin,
      pixrem,
      will_change,//autoprefixer应写在此属性之后，编译之后的属性还可以自动添加前缀
      autoprefixer
   ]
   //var processors = [precss];
   return gulp.src('./public/css/**/*.css')
            .pipe(postcss(processors1))
            .pipe(gulp.dest('./public/dist/styles/'));
})
gulp.task('webpack', function() {
   return gulp.src('./public/script/page/**/*.js')
              .pipe(named())
              .pipe(webpack(require('./webpack.config.js')))
              .pipe(gulp.dest('./public/script/dist/page/'))
              .pipe(connect.reload());
});

gulp.task('watch', function () {
   gulp.watch('./public/css/**/*.css', ['css']);

   gulp.watch(['./public/script/**/*.@(js|handlebars)', '!./public/script/dest/**/*.js'], ['webpack']);
});

gulp.task('webserver:dev', function() {
   var options = {
   };
   server.run(['app.js'], options);
});

gulp.task('clean', function (cb) {
   return del([
      './public/image/sprites/**',
      './public/less/sprite/**',
      './public/style/**',
      './public/script/dest/**'
   ], {force: true}, cb);
});

gulp.task('dev', function (done) {
   //CONFIG['isDebug'] = true;
   runSequence(
      'clean',
      'css',
      'webserver:dev',
      //'webpack',
      'watch',
   done);
});
gulp.task('default', function() {
   // 将你的默认的任务代码放在这
   console.log('default task');
});

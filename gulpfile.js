var gulp = require('gulp'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  minify = require('gulp-minify-css'),
  newer = require('gulp-newer'),
  sourcemaps = require('gulp-sourcemaps'),
  stylus = require('gulp-stylus'),
  uglify = require('gulp-uglify'),
  stylish = require('jshint-stylish'),
  rupture = require('rupture'),
  streamqueue = require('streamqueue')

gulp.task('css', function () {
  return streamqueue(
    {objectMode: true},
    gulp.src('src/css/vendor/*.css'),
    gulp.src('src/css/*.styl')
  )
  .pipe(stylus({use: [rupture()], import: ['rupture']}))
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.css'))
  .pipe(minify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/css'))
})

gulp.task('js', function () {
  return streamqueue(
    {objectMode: true},
    gulp.src('src/js/vendor/*.js'),
    gulp.src('src/js/*.js')
  )
  // .pipe(jshint())
  // .pipe(jshint.reporter(stylish))
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/js'))
})

gulp.task('img', function () {
  gulp.src('src/img/*')
  .pipe(newer('dist/img'))
  .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
  .pipe(gulp.dest('dist/img'))
})

gulp.task('default', ['css', 'js', 'img'], function () {
  gulp.watch('src/css/*.styl', ['css'])
  gulp.watch('src/css/vendor/*.css', ['css'])
  gulp.watch('src/js/*.js', ['js'])
  gulp.watch('src/js/vendor/*.js', ['js'])
})
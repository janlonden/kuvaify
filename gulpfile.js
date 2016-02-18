var gulp = require('gulp')
var concat = require('gulp-concat')
var minify = require('gulp-minify-css')
var sourcemaps = require('gulp-sourcemaps')
var stylus = require('gulp-stylus')
var uglify = require('gulp-uglify')
var rupture = require('rupture')

gulp.task('css', function () {
  gulp.src('src/css/*')
  .pipe(stylus({use: [rupture()], import: ['rupture']}))
  .pipe(sourcemaps.init())
  .pipe(concat('kuvaify.min.css'))
  .pipe(minify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/'))
})

gulp.task('js', function () {
  gulp.src('src/js/kuvaify.js')
  .pipe(sourcemaps.init())
  .pipe(concat('kuvaify.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['css', 'js'], function () {
  gulp.watch('src/css/*.styl', ['css'])
  gulp.watch('src/js/kuvaify.js', ['js'])
})
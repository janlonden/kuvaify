import 'babel-polyfill'
import babelify from 'babelify'
import browserify from 'browserify'
import del from 'del'
import gulp from 'gulp'
import changed from 'gulp-changed'
import concat from 'gulp-concat'
import nano from 'gulp-cssnano'
import imagemin from 'gulp-imagemin'
import sourcemaps from 'gulp-sourcemaps'
import stylus from 'gulp-stylus'
import uglify from 'gulp-uglify'
import gutil from 'gulp-util'
import rupture from 'rupture'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'

const paths = {
  js: 'src/js/**/*.js',
  cssWatch: 'src/css/**/*.{styl,css}',
  cssTask: ['src/css/main.styl', 'src/css/vendor/**/*.css'],
  img: 'src/img/**/*'
}

gulp.task('clean', () => del(['dist']))

gulp.task('js', () => {
  browserify({ entries: 'src/js/main.js', debug: true })
    .transform(babelify)
    .on('error', gutil.log)
    .bundle()
    .on('error', gutil.log)
    .pipe(source('all.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('css', () => {
  return gulp.src(paths.cssTask)
    .pipe(stylus({use: [rupture()], import: ['rupture']}))
    .pipe(concat('all.min.css'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(nano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('img', () => {
  return gulp.src(paths.img)
    .pipe(changed('dist/img'))
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/img'))
})

gulp.task('watch', () => {
  gulp.watch(paths.js, ['js'])
  gulp.watch(paths.cssWatch, ['css'])
  gulp.watch(paths.img, ['img'])
})

gulp.task('default', ['watch', 'js', 'css', 'img'])
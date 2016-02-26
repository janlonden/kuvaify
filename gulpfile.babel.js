import babelify from 'babelify'
import browserify from 'browserify'
import gulp from 'gulp'
import concat from 'gulp-concat'
import nano from 'gulp-cssnano'
import sourcemaps from 'gulp-sourcemaps'
import stylus from 'gulp-stylus'
import uglify from 'gulp-uglify'
import gutil from 'gulp-util'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'
import rupture from 'rupture'

let paths = {
  js: 'src/js/**/*.js',
  cssWatch: 'src/css/**/*.{styl,css}',
  cssTask: 'src/css/kuvaify.styl'
}

gulp.task('js', () => {
  browserify({ entries: 'src/js/kuvaify.js', debug: true })
    .transform(babelify)
    .on('error', gutil.log)
    .bundle()
    .on('error', gutil.log)
    .pipe(source('kuvaify.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('css', () => {
  return gulp.src(paths.cssTask)
    .pipe(stylus({use: [rupture()], import: ['rupture']}))
    .pipe(concat('kuvaify.min.css'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(nano())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', () => {
  gulp.watch(paths.js, ['js'])
  gulp.watch(paths.cssWatch, ['css'])
})

gulp.task('default', ['watch', 'js', 'css'])
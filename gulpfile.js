var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  cssnano = require('gulp-cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  args = require('yargs').argv,
  browserSync = require('browser-sync').create();

const isProd = args.prod ? true : false;
const isDev = !isProd;

gulp.task('build-html', () => {
  return gulp.src('./*.html').pipe(gulp.dest('./dist'));
});

gulp.task('watch-html', gulp.parallel('build-html'), browserSync.reload);

gulp.task('build-img', () => {
  return gulp
    .src('./img/**/*.{svg,jpg,jpeg,gif,png}')
    .pipe(gulp.dest('./dist/img'));
});
gulp.task('watch-img', gulp.parallel('build-img'), browserSync.reload);

gulp.task('build-js', () => {
  return gulp
    .src('./js/**/*.js')
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(gulpif(isProd, uglify().on('error', gutil.log)))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./dist/js'));
});
gulp.task('watch-js', gulp.parallel('build-js'), browserSync.reload);

gulp.task('build-css', () => {
  return gulp
    .src('./css/**/*.css')
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(gulpif(isProd, cssnano()))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task(
  'build',
  gulp.parallel('build-html', 'build-js', 'build-css', 'build-img')
);

gulp.task(
  'serve',
  gulp.series('build', () => {
    browserSync.init({
      proxy: 'xn--mn8hhf.ws.dev:8000'
    });

    gulp.watch('./*.html', gulp.parallel('watch-html'));
    gulp.watch('./js/**/*.js', gulp.parallel('watch-js'));
    gulp.watch('./img/**/*.{svg,jpg,jpeg,gif,png}', gulp.parallel('watch-img'));
    gulp.watch('./css/**/*.css', gulp.parallel('build-css'));
  })
);

gulp.task('default', gulp.parallel('build'));

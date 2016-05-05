var gulp         = require('gulp'),
    gulpif       = require('gulp-if'),
    gutil        = require('gulp-util'),
    uglify       = require('gulp-uglify'),
    cssnano      = require('gulp-cssnano'),
    sourcemaps   = require('gulp-sourcemaps'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    args         = require('yargs').argv,
    browserSync  = require('browser-sync').create();

var isProd = args.prod ? true : false,
    isDev  = !isProd;

gulp.task('default', ['build']);

gulp.task('build', ['build-html', 'build-js', 'build-css', 'build-img']);

gulp.task('build-html', function () {
    return gulp.src('./*.html')
        .pipe(gulp.dest('./dist'));
});
gulp.task('watch-html', ['build-html'], browserSync.reload);

gulp.task('build-img', function () {
    return gulp.src('./img/**/*.{svg,jpg,jpeg,gif,png}')
        .pipe(gulp.dest('./dist/img'));
});
gulp.task('watch-img', ['build-img'], browserSync.reload);

gulp.task('build-js', function () {
    return gulp.src('./js/**/*.js')
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(gulpif(isProd, uglify().on('error', gutil.log)))
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(gulp.dest('./dist/js'));
});
gulp.task('watch-js', ['build-js'], browserSync.reload);

gulp.task('build-css', function () {
    return gulp.src('./css/**/*.css')
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulpif(isProd, cssnano()))
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['build'], function() {
    browserSync.init({
        proxy: 'xn--mn8hhf.ws.dev:8000'
    });

    gulp.watch('./*.html', ['watch-html']);
    gulp.watch('./js/**/*.js', ['watch-js']);
    gulp.watch('./img/**/*.{svg,jpg,jpeg,gif,png}', ['watch-img']);
    gulp.watch('./css/**/*.css', ['build-css']);
});

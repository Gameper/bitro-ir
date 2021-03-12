var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './app',
  });

  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/*.html').on('change', browserSync.reload);
});

// var processorsArray = [require('autoprefixer')({ grid: true, browsers: ['last 2 versions', 'ie 10-11', 'Firefox > 20'] })];
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return (
    gulp
      .src('app/scss/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.stream())
  );
});

gulp.task('default', ['serve']);

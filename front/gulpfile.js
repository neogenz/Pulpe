'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', () => {
  return gulp.src('./src/assets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/assets/**/*.scss', ['sass']);
});

'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

const buildSass = () => {
  return gulp
    .src('./assets/sass/**/*.scss')
    .pipe(
      sass({
        includePaths: [
          './node_modules/govuk_frontend_toolkit/stylesheets', // 1
          './node_modules/govuk-elements-sass/public/sass' // 2
        ]
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('./public/css'));
};

gulp.task('default', buildSass);
gulp.task('build', buildSass);

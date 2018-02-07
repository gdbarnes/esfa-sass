'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

const buildSass = () => {
  return gulp
    .src('./assets/sass/**/*.scss')
    .pipe(
      sass({
        includePaths: [
          './node_modules/govuk_frontend_toolkit/stylesheets',
          './node_modules/govuk-elements-sass/public/sass'
        ]
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('./assets/stylesheets'))
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
    )
    .on('error', sass.logError)
    .pipe(gulp.dest('./assets/stylesheets'));
};

gulp.task('default', buildSass);
gulp.task('build', buildSass);

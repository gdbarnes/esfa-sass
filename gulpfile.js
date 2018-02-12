'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');

const config = {
  srcSass: './assets/sass/**/*.scss',
  srcCss: './node_modules/govuk_template_jinja/assets/stylesheets/*.css',
  outputDir: './public/assets/stylesheets'
};

const buildSass = () => {
  return gulp
    .src(config.srcSass)
    .pipe(
      sass({
        includePaths: [
          './node_modules/govuk_frontend_toolkit/stylesheets',
          './node_modules/govuk-elements-sass/public/sass'
        ]
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(config.outputDir));
};

const copyCss = () => {
  return gulp.src(config.srcCss).pipe(gulp.dest(config.outputDir));
};

/* 
  TODO
  Ammend the task above or create a new task which copies accross all of the images and stylesheets!!
*/

const minCss = () => {
  return gulp
    .src(config.outputDir + '/*.css')
    .pipe(cleanCSS({ compatibility: 'ie7' }))
    .pipe(gulp.dest(config.outputDir + '/minified'));
};

gulp.task('buildSass', buildSass);
gulp.task('copyCss', copyCss);
gulp.task('minCss', ['buildSass', 'copyCss'], minCss);

gulp.task('default', ['minCss']);

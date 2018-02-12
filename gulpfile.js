'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const size = require('gulp-size');
const rename = require('gulp-rename');

const config = {
  srcSass: './assets/sass/**/*.scss',
  srcTemplate: './node_modules/govuk_template_jinja/assets/**/*',
  outputDir: './public/assets'
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
    .pipe(gulp.dest(config.outputDir + '/stylesheets'));
};

const copyTemplateAssets = () => {
  return gulp.src(config.srcTemplate).pipe(gulp.dest(config.outputDir));
};

const minCss = () => {
  return gulp
    .src(config.outputDir + '/stylesheets/*.css')
    .pipe(cleanCSS({ compatibility: 'ie7' }))
    .pipe(size({ title: 'styles' }))
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest(config.outputDir + '/stylesheets/minified'));
};

gulp.task('buildSass', buildSass);
gulp.task('copyTemplateAssets', copyTemplateAssets);
gulp.task('minCss', ['buildSass', 'copyTemplateAssets'], minCss);

gulp.task('default', ['minCss']);

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

const compileSass = () => {
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
    .pipe(
      size({
        showFiles: true,
        title: 'Compiled Sass: '
      })
    )
    .pipe(gulp.dest(config.outputDir + '/stylesheets'));
  // .pipe(notify({ message: 'SASS COMPILATION COMPLETE 🎁' }));
};

const copyTemplateAssets = () => {
  return gulp
    .src(config.srcTemplate)
    .pipe(
      size({
        showFiles: true,
        title: 'Template assets:'
      })
    )
    .pipe(gulp.dest(config.outputDir));
  // .pipe(notify({ message: 'TEMPLATE ASSETS COPIED 👯‍' }));
};

const minifyCss = () => {
  return gulp
    .src(config.outputDir + '/stylesheets/*.css')
    .pipe(cleanCSS({ compatibility: 'ie7' }))
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(
      size({
        showFiles: true,
        title: 'Minified css: '
      })
    )
    .pipe(gulp.dest(config.outputDir + '/stylesheets'));
  // .pipe(notify({ message: 'CSS FILES MINIFIED 🗜' }));
};

gulp.task('compileSass', compileSass);
gulp.task('copyTemplateAssets', ['compileSass'], copyTemplateAssets); // wait for compileSass to finish
gulp.task('minifyCss', ['copyTemplateAssets'], minifyCss); // wait for copyTemplateAssets to finish

gulp.task('default', ['minifyCss']);

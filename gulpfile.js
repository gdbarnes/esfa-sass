'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const size = require('gulp-size');
const rename = require('gulp-rename');

const config = {
  srcSass: './assets/sass/**/*.scss',
  srcTemplate: './node_modules/govuk_template_jinja/assets/**/*',
  srcToolkitImages: './node_modules/govuk_frontend_toolkit/images/**/*',
  outputDir: './public/assets'
};

const emptyAssetsDir = () => {
  return gulp.src(config.outputDir, { read: false }).pipe(clean({ force: true }));
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
        showFiles: false,
        title: 'Compiled Sass: '
      })
    )
    .pipe(gulp.dest(config.outputDir + '/stylesheets'));
};

const copyTemplateAssets = () => {
  return gulp
    .src(config.srcTemplate)
    .pipe(
      size({
        showFiles: false,
        title: 'Template assets:'
      })
    )
    .pipe(gulp.dest(config.outputDir));
};

const copyToolkitImages = () => {
  return gulp
    .src(config.srcToolkitImages)
    .pipe(
      size({
        showFiles: false,
        title: 'Toolkit images:'
      })
    )
    .pipe(gulp.dest(config.outputDir + '/stylesheets'));
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
        showFiles: false,
        title: 'Minified css: '
      })
    )
    .pipe(gulp.dest(config.outputDir + '/stylesheets'));
};

// do one thing at a time to avoid races
gulp.task('emptyAssetsDir', emptyAssetsDir);
gulp.task('compileSass', ['emptyAssetsDir'], compileSass);
gulp.task('copyToolkitImages', ['compileSass'], copyToolkitImages);
gulp.task('copyTemplateAssets', ['copyToolkitImages'], copyTemplateAssets);
gulp.task('minifyCss', ['copyTemplateAssets'], minifyCss);

gulp.task('default', ['minifyCss']);

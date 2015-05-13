'use strict';

// Packages

var autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    del          = require('del'),
    gulp         = require('gulp'),
    imagemin     = require('gulp-imagemin'),
    reload       = browserSync.reload,
    runSequence  = require('run-sequence'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps');


// Configuration

var paths = {
  fonts: ['./app/fonts/*'],
  html:  ['./app/*.html'],
  img:   ['./app/images/**/*'],
  js:    ['./app/js/**/*.js'],
  jspm:  ['./jspm_packages/**/*', './config.js'],
  scss:  ['./app/scss/**/*.scss']
};


// Tasks

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('clean', function(cb) {
  del(['./dist'], cb);
});

gulp.task('compile', ['clean'], function() {
  runSequence(['fonts', 'images', 'javascript', 'jspm', 'stylesheets', 'templates']);
});

gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('images', function() {
  return gulp.src(paths.img)
    .pipe(imagemin({
      multipass: true,
      svgoPlugins: [{collapseGroups: false, removeViewBox: false}]
    }))
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('javascript', function() {
  return gulp.src(paths.js)
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('jspm', function() {
  return gulp.src(paths.jspm, { base: './' })
    .pipe(gulp.dest('./dist'));
});

gulp.task('stylesheets', function() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/stylesheets'))
    .pipe(reload({stream: true}));
});

gulp.task('templates', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.html, ['templates']);
  gulp.watch(paths.img,  ['images']);
  gulp.watch(paths.js,   ['javascript']);
  gulp.watch(paths.scss, ['stylesheets']);

  gulp.watch('./dist/*.html').on('change', reload);
});

gulp.task('default', function() {
  runSequence('compile', 'browser-sync', 'watch');
});

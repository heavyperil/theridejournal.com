'use strict';

// Packages

var autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    del          = require('del'),
    ghPages      = require('gulp-gh-pages'),
    gulp         = require('gulp'),
    htmlreplace  = require('gulp-html-replace'),
    imagemin     = require('gulp-imagemin'),
    reload       = browserSync.reload,
    RevAll       = require('gulp-rev-all'),
    runSequence  = require('run-sequence'),
    sass         = require('gulp-sass'),
    shell        = require('gulp-shell'),
    size         = require('gulp-size'),
    sourcemaps   = require('gulp-sourcemaps');


// Configuration

var paths = {
  files: ['./app/CNAME'],
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
  runSequence(['files', 'fonts', 'images', 'javascript', 'jspm', 'stylesheets', 'templates']);
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

gulp.task('files', function() {
  return gulp.src(paths.files)
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.html, ['templates']);
  gulp.watch(paths.img,  ['images']);
  gulp.watch(paths.js,   ['javascript']);
  gulp.watch(paths.scss, ['stylesheets']);

  gulp.watch('./dist/*.html').on('change', reload);
});

gulp.task('buildJS', shell.task([
  'jspm bundle-sfx app/js/main dist/js/app.js --minify'
]));

gulp.task('html', function () {
  gulp.src('./dist/index.html')
  .pipe(htmlreplace({
    'js': {
      src: 'js/app.js',
      tpl: '<script src="%s" async defer></script>'
    }
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('rev', function() {
  var revAll = new RevAll({dontRenameFile: [/\.html/, /CNAME$/]});

  gulp.src('dist/**')
  .pipe(revAll.revision())
  .pipe(size({
    showFiles: true,
    gzip: true
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean'], function() {
  runSequence(['files', 'fonts', 'images', 'buildJS', 'stylesheets', 'templates'], 'html', 'rev');
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', function() {
  runSequence('compile', 'browser-sync', 'watch');
});

'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const mainBowerFiles = require('main-bower-files');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const clean = require('gulp-clean');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const watchify = require('watchify');
const _ = require('lodash');
const gutil = require('gulp-util');
const karma = require('karma').server;

const CLIENT_DEST = 'dist';
const TEMP = '.tmp';

gulp.task('serve', ['build', 'watch-client-test'], () => {
  require('./server/app');
  //gulp.watch('server/')
});

gulp.task('watch-client-test', (done) => {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
    , singleRun: false
  }, done);
});

gulp.task('test:client', (done) => {
  karma.start({
      configFile: __dirname + '/karma.conf.js'
    , singleRun: true
  }, done);
});

gulp.task('clean', () => {
  return gulp.src(CLIENT_DEST, {read: false})
    .pipe(clean()) // TODO: Use del instead -  no gulp-specific plugin
  ;
});

gulp.task('copy-static', () => {
  return gulp.src(['client/index.html', 'client/assets/**/*', 'node_modules/babel-core/browser-polyfill.js'])
    .pipe(gulp.dest(CLIENT_DEST))
    .pipe(reload({stream: true}))
  ;
});

const buildJs = (watching) => {
  const browserifyOpts = {
      entries: ['./client/app/app.jsx']
    , extensions: ['.jsx']
    , debug: true
  };
  const watchifyOpts = _.assign({}, watchify.args, browserifyOpts);

  var bundler;
  if(watching) {
    bundler = watchify(browserify(watchifyOpts));
  }
  else {
    bundler = browserify(watchifyOpts);
  }

  bundler.on('log', gutil.log);
  //bundler.on('error', gutil.error);
  bundler.on('update', () => {
    gutil.log('updating...');
    buildJs();
  });
  return bundler
    .transform(babelify)
    .bundle()
  //return gulp.src(['client/app/**/*.{js,es6}', '!**/*.spec.{js,es6}', TEMP + 'templates.js'])
//    .dest(CLIENT_DEST + '/src') # don't think we need to copy for sourcemaps
    .pipe(source('app.min.js'))
    //.pipe(buffer())
    //.pipe(sourcemaps.init({debug: true}))
    //.pipe(babel())
    //.pipe(concat('app.min.js'))
    //.pipe(uglify())
    //.pipe(sourcemaps.write(CLIENT_DEST + '/js'))
    .pipe(gulp.dest(CLIENT_DEST + '/js'))
    //.pipe(reload({stream: true}))
    ;
};

gulp.task('build-app', buildJs);

gulp.task('build', ['build-app', 'copy-static']);

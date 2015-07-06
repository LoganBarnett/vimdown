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
const jasmine = require('gulp-jasmine');
const notify = require('gulp-notify');
const nodemon = require('nodemon');
const sass = require('gulp-sass');

//import mocha from 'gulp-mocha';
//import babelRegister from 'babel-core/register';

const CLIENT_DEST = 'dist';
const TEMP = '.tmp';

const handleError = (task) => {
  return (err) => {
    gutil.log(gutil.colors.red(err));
    // what logs exactly?...
    notify.onError(task + ' failed, check logs...')(err);
  }
};

gulp.task('serve', ['host:main', 'styles', 'build-and-watch', 'copy-static', 'watch-client-test', 'styles:watch'], () => {
  //require('./server/app');
  //gulp.watch('server/')
});

gulp.task('watch-server-test', () => {
  return gulp.watch('./server/**/*.spec.js', ['test:server']);
});

gulp.task('watch-client-test', () => {
  //gulp.watch('./client/app/**/*.jsx', () => {
    karma.start({
      configFile:  __dirname + '/karma.conf.js'
      , singleRun: false
    });
  //});
});

gulp.task('test:client', (done) => {
  karma.start({
      configFile: __dirname + '/karma.conf.js'
    , singleRun: true
  }, done);
});

gulp.task('test:server', () => {
  return gulp.src('./server/**/*.spec.js')
    //.pipe(babel())
    .pipe(jasmine({includeStackTrace: true}))
    //.pipe(mocha({compilers: {js: babelRegister}}))
  ;
});

gulp.task('clean', () => {
  return gulp.src(CLIENT_DEST, {read: false})
    .pipe(clean()) // TODO: Use del instead -  no gulp-specific plugin
  ;
});

gulp.task('styles', () => {
  return gulp.src('./client/sass/**/*.scss')
    .pipe(sass({
        outputStyle: 'nested'
      , includePaths: ['./client/node_modules/bootstrap-sass/assets/stylesheets']
    }).on('error', sass.logError))
    .pipe(gulp.dest(CLIENT_DEST + '/css'))
  ;
});

gulp.task('styles:watch', () => {
  return gulp.watch('./client/sass/**/*.scss', ['styles']);
});

gulp.task('copy-static', () => {
  return gulp.src(['client/index.html', 'client/assets/**/*', 'node_modules/babel-core/browser-polyfill.js'])
    .pipe(gulp.dest(CLIENT_DEST))
    //.pipe(reload({stream: true}))
  ;
});

const buildJs = (watching) => {
  gutil.log('building... (watching=' + watching + ')');
  const browserifyOpts = {
      entries: ['./client/app/app.jsx']
    , extensions: ['.jsx', '.js']
    , debug: true
    // TODO: Add watch: true and keepAlive: true
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
    // TODO: whaaaa? backtick not working in this gulp file.
    //gutil.log(`updating... (watching=${watching})`);
    gutil.log('updating... (watching=' + watching + ')');
    buildJs(true);
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

gulp.task('build-once', _.partial(buildJs, false));
gulp.task('build-and-watch', _.partial(buildJs, true));

gulp.task('build', ['build-once', 'copy-static'], () => {
  // does this need a callback?
  gutil.log('Done with build');
});


gulp.task('host:main', ['watch-server-test'], () => {
  nodemon({
      script: './server/app.js'
    , ext: 'html js'
    , env: {'NODE_ENV': 'production'}
    , stdout: false
    , stderr: false
    //, nodeArgs: ['--debug']
    , nodeArgs: ['--harmony']
    , watch: 'server/**/!(*.spec).js'
  });

  nodemon.on('restart', (files) => {
    gutil.log('[server] App restarted due to', gutil.colors.cyan(files));
  }).on('stdout', (raw) => {
    const message = raw.toString('utf8');
    gutil.log('[server]', gutil.colors.green(message));
    if(message.indexOf('[server] Restart complete.') != -1) {
      //browserSync.reload();
    }
  }).on('stderr', (err) => {
    const message = err.toString('utf8');
    // For some reason debugger attachment gets logged on 'stderr', so we catch it here...
    //if(message.indexOf('debugger listening on port' == 0)) {
    //  gutil.log('[server]', gutil.colors.green(message));
    //}
    //else {
      handleError('[server]')(message);
    //}
  })
  ;
});

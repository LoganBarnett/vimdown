'use strict';

module.exports = (config) => {
  config.set({
    basePath: './client/app'
    , frameworks: ['browserify', 'jasmine']
    , files: [
        '**/*.spec.jsx'
      , '../../utils/test/function_bind_polyfill.js'
      //, '**/*.spec.js'
    ]
    , exclude: [

    ]
    , preprocessors: {
        '**/*.spec.jsx': ['browserify']
      //, '**/*.spec.js': ['browserify']
    }
    , browserify: {
        debug: true
      , extensions: ['.jsx']
      , configure: (bundle) => {
        bundle.once('prebundle', () => {
          bundle.transform('babelify');
        });
      }
    }
    , watchify: {
      poll: true
    }
    , reporters: ['progress']
    //, junitReporter: {
    //    outputFile: '.tmp/karma-test-results.xml'
    //  , suite: ''
    //}
    , port: 9876
    , colors: true
    //, logLevel: config.LOG_DEBUG
    , logLevel: config.LOG_INFO
    , autoWatch: true
    , singleRun: true
    , browsers: ['PhantomJS']
  });
};
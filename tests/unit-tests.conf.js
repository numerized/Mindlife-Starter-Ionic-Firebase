// Karma configuration
// Generated on Thu Nov 05 2015 23:44:05 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../www/js/config/_config.js',
      '../www/lib/00custom/ionic.bundle1.1.0.customv2.js',
      '../www/lib/angular-mocks/angular-mocks.js',
      '../www/lib/angular-resource/angular-resource.js',
      '../www/lib/angular-websocket/angular-websocket.js',
      '../www/lib/angular-translate/angular-translate.min.js',
      '../www/lib/firebase/firebase-debug.js',
      '../www/lib/angularfire/dist/angularfire.min.js',
      '../www/lib/angular-permission/dist/angular-permission.js',
      '../www/lib/ng-cordova/dist/ng-cordova.min.js',
      '../www/lib/angular-elastic/elastic.js',
      '../www/lib/lodash/lodash.min.js',
      '../www/lib/moment/moment.js',
      '../www/lib/moment/locale/fr.js',
      '../www/lib/moment/locale/en-gb.js',
      '../www/js/*.js',
      '../www/js/**/*.js',
      '../www/lib/00custom/enterSubmit-directive.js',
      '../www/lib/00custom/textarea-directive.js'      
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}

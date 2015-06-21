module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      '../../angular/angular.js',
      '../../angular/angular-mocks.js',
      '../../chapter08/08_fromnow_filter/app.js',
      '../../chapter08/08_fromnow_filter/fromnow.js',
      'fromnow_filter_spec.js'
    ],
    frameworks: ['jasmine'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};

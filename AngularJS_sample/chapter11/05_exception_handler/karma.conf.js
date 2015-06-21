module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      '../../angular/angular.js',
      '../../angular/angular-mocks.js',
      'simple_filter.js',
      'timer_service.js',
      'handled_spec.js',
      'unhandled_spec.js'
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

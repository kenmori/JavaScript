module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      '../../angular/angular.js',
      '../../angular/angular-mocks.js',
      '../../angular/angular-resource.js',
      'users_service.js',
      'users_service_spec.js'
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

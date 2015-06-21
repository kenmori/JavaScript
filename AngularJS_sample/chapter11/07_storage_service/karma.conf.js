module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      '../../angular/angular.js',
      '../../angular/angular-mocks.js',
      '../../chapter09/08_storage_service/app.js',
      '../../chapter09/08_storage_service/storage_service.js',
      '../../chapter09/08_storage_service/storage_controller.js',
      'storage_controller_spec.js'
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

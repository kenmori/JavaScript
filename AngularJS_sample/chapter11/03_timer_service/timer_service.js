angular.module('app', [])
  .service('timerService', function ($timeout) {
    this.message = 'まだだよ。';
    var self = this;
    $timeout(function () {
      self.message = 'またせたな！';
    }, 1000000);
  });
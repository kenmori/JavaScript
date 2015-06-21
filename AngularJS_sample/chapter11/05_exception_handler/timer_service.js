angular.module('app.service', [])
  .factory('timerService', function ($timeout) {
    // 指定した時間以内にキャンセルしないと例外が発生するサービス
    return function (time) {
      var promise = $timeout(function () {
        throw Error('timeout');
      }, time);
      return function () {
        $timeout.cancel(promise);
      }
    }
  });
angular.module('app')
  .config(['MyServiceProvider',
    function (MyServiceProvider) {
      MyServiceProvider.setPrefix('[');
      MyServiceProvider.setSuffix(']');
    }]);

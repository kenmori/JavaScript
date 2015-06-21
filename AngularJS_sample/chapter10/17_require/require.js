angular.module('app')
  .directive('requireDirective', function () {
    return {
      restrict: 'E',
      controller: function () {
        this.message = "hoge";
      },
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {

      }
    }
  });

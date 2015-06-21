angular.module('app')
  .directive('tax', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      template: '<input type="text" class="tax">',
      replace: true,
      scope: {rate: '='},
      link: function (scope, element, attrs, ngModelCtrl) {

        // (1) $modelValueが変化したときにDOMのレンダリング処理をおこなう
        ngModelCtrl.$render = function () {
          element.val(ngModelCtrl.$viewValue);
        };

        // (2) DOMのイベントが発生したときに$viewValueを変更する
        element.on('change', function () {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(element.val());
          });
        });

        // (3) $modelValueから$viewValueへの変換
        ngModelCtrl.$formatters.push(function (price) {
          price = parseInt(price);
          if (isNaN(price)) {
            ngModelCtrl.$setValidity('tax', false);
            ngModelCtrl.$setPristine();
            return '';
          } else {
            ngModelCtrl.$setValidity('tax', true);
            return Math.floor(price * (1 + scope.rate));
          }
        });

        // (4) $viewValueから$modelValueへの変換
        ngModelCtrl.$parsers.push(function (price) {
          price = parseInt(price);
          if (isNaN(price)) {
            ngModelCtrl.$setValidity('tax', false);
            return '';
          } else {
            ngModelCtrl.$setValidity('tax', true);
            return Math.ceil(price / (1 + scope.rate));
          }
        });
      }
    };
  }]);

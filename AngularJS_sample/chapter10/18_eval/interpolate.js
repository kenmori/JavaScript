angular.module('app')
  .directive('interpolateDirective', ['$interpolate', function ($interpolate) {
    return {
      restrict: 'E',
      template: 'x: {{x}}',
      scope: {},
      link: function (scope) {
        scope.a = 1;
        scope.b = 2;
        // (1) 埋め込み式を含んだ文字列の解析をおこなう
        var exp = $interpolate('result = {{a + b}}');
        // (2) 解析結果を評価する
        scope.x = exp(scope);
      }
    };
  }]);

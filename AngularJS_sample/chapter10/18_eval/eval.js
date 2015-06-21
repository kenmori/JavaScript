angular.module('app')
  .directive('evalDirective', function () {
    return{
      restrict: 'E',
      template: 'x: {{x}}, y:{{y}}',
      scope: {},
      link: function (scope) {
        scope.a = 10;
        scope.b = 23;
        // (1) 引数で渡した文字列を即時評価
        scope.x = scope.$eval('a + b');
        // (2) 引数で渡した文字列を$digestループ時に評価
        scope.$evalAsync('y = a + b');
      }
    }
  });
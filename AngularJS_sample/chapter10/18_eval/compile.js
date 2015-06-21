angular.module('app')
  .directive('compileDirective', ['$compile', function ($compile) {
    return {
      restrict: 'E',
      scope: {},
      link: function (scope, element) {
        // (1) コンパイル対象の要素を準備
        var el = angular.element('<div ng-if="active">message: {{message}}</div>');
        // (2) compile関数を実行してlink関数を取得
        var linkFn = $compile(el);

        scope.active = true;
        scope.message = 'Hello, World!';

        // (3) link関数を実行して、実行結果の要素を取得
        var output = linkFn(scope);
        element.append(output);
      }
    };
  }]);
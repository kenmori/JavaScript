angular.module('app')
  .directive('rating', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        max: '=',
        readonly: '='
      },
      link: function (scope, element, attrs, ngModelCtrl) {

        // (1) scopeの値が変化したら再描画
        ngModelCtrl.$render = function () {
          updateRate(ngModelCtrl.$viewValue);
        };

        // (2) ng-modelにバインドされた値に応じて星を描画
        function updateRate(rate) {
          // メモリリーク回避のためイベントを解除し、要素を空にする
          angular.forEach(element.children(), function (child) {
            angular.element(child).off('click');
          });
          element.empty();

          for (var i = 0; i < scope.max; i++) {
            var span = angular.element('<span></span>');
            var star = i < rate ? '★' : '☆';
            span.text(star);

            // (3) 編集可能な場合の処理
            if (!scope.readonly) {
              span.addClass('changeable');
              (function () {
                var count = i + 1;
                span.on('click', function () {
                  // クリックされた箇所に応じて星の数の再描画
                  scope.$apply(function () {
                    ngModelCtrl.$setViewValue(count);
                    updateRate(count);
                  });
                });
              })();
            }
            element.append(span);
          }
        }

        // (4) scopeの値が範囲外だった場合は、範囲内に収まるように変換する
        ngModelCtrl.$formatters.push(function (rate) {
          if (rate < 0) {
            return 0;
          } else if (rate > scope.max) {
            return scope.max;
          } else {
            return rate;
          }
        });
      }
    };
  }]);

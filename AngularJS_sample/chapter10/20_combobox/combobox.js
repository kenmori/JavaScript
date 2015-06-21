angular.module('app')
  .directive('comboBox', function () {
    return {
      scope: {
        selectedItem: '=',
        allItems: '='
      },
      restrict: 'EA',
      template: '<div class="combobox">' +
        '<input type="text" ng-model="selectedItem">' +
        '<ul ng-show="isFocus">' +
        '<li ng-repeat="item in allItems" ng-click="click($event, item)">' +
        '{{item}}' +
        '</li>' +
        '</ul>' +
        '</div>',
      link: function (scope, iElement) {
        scope.isFocus = false;

        // (1) inputにフォーカスがあたったら選択肢を表示する
        iElement.find('input')
          .on('focus', function () {
            scope.$apply(function () {
              scope.isFocus = true;
            });
          });

        // (2) クリックされた要素を選択済みとして保存し、選択肢を閉じる
        scope.click = function ($event, item) {
          $event.preventDefault();
          $event.stopPropagation();
          scope.selectedItem = item;
          scope.isFocus = false;
        };
      }
    };
  });


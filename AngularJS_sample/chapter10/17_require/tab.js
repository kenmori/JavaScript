angular.module('app', [])
  .controller('tabSetController', ['$scope', function ($scope) {
    this.tabs = $scope.tabs = [];
    this.addTab = function (tab) {
      this.tabs.push(tab);
    }
  }])
  .directive('tabSet', function () {
    return {
      restrict: 'E',
      scope: {},
      template: '<select ng-model="selectedTab" ng-options="tab.header for tab in tabs" >' +
        '</select>' +
        '<div ng-transclude></div>',
      controller: 'tabSetController',
      transclude: true,
      link: function (scope, element, attrs, tabSetCtrl) {
        scope.$watch('selectedTab', function (selectedTab) {
          if (selectedTab) {
            angular.forEach(scope.tabs, function (tab) {
              // 選択されているタブだけを表示する
              tab.isActive = tab.header == selectedTab.header;
            });
          }
        });
      }
    }
  })
  .directive('tab', function () {
    return {
      restrict: 'E',
      scope: {},
      template: '<div ng-show="isActive"><div ng-transclude></div></div>',
      require: '^tabSet',
      transclude: true,
      link: function (scope, element, attrs, tabSetCtrl) {
        scope.header = attrs.header;
        // tabSetControllerにscopeを追加
        tabSetCtrl.addTab(scope);
      }
    }
  });

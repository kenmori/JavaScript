var app = angular.module('app', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/angular', {
        controller: 'AngularController',
        templateUrl: 'partials/angular.html'
      })
      .when('/angular/:apiType', {
        controller: 'AngularController',
        templateUrl: 'partials/angular-api.html'
      })
      .when('/angular/:apiType/method/:method*', {
        controller: 'AngularController',
        templateUrl: 'partials/angular-api-method.html'
      })
      .otherwise({
        redirectTo: '/angular'
      });
  }]);
app.controller('AngularController', ["$scope", function($scope){
  $scope.apiType = "routing";
  $scope.method = "method";
}]);

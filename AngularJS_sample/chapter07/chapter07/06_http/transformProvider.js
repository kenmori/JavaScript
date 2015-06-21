var app = angular.module('app', ['httpbackend']);
app.config(['$httpProvider', function($httpProvider){
  $httpProvider.defaults.transformResponse.push(function(data){
    data.hello = "world";
    return data;
  });
}]);
app.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
  $scope.http = function(){
    $http.get('api/data', {}).success(function(d){
      console.log(d);
    });
  };
}]);

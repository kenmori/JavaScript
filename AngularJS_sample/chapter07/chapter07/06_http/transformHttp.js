var app = angular.module('app', ['httpbackend']);
app.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
  $http.defaults.transformResponse.push(function(data){
    data.hello = "world";
    return data;
  });
  $scope.http = function(){
    $http.get('api/data', {}).success(function(d){
      console.log(d);
    });
  };
}]);

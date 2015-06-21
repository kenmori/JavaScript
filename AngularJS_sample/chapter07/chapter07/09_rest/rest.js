var app = angular.module('app', ['httpbackend']);
app.controller('RESTCtrl', ['$scope', '$http', function($scope, $http){
  $scope.getList = function(){
    $http.get('/api/users').success(function(users){
      $scope.users = users;
    });
  };
  $scope.getUser = function(userId){
    $scope.users = null;
    $http.get('/api/users/'+userId).success(function(user){
      $scope.user = user;
    });
  };
  $scope.addUser = function(user){
    $http.post('/api/users/', user).success(function(user){
      if($scope.users){
        $scope.users.push(user);
      }
    });
  };
  $scope.saveUser = function(user){
    $http.put('/api/users/'+user.id, user).success(function(user){
      $scope.user = null;
      $scope.getList();
    });
  };
  $scope.removeUser = function(userId){
    $http.delete('/api/users/'+userId).success(function(user){
      $scope.users = $scope.users.filter(function(user){
        return user.id != userId;
      });
    });
  };
}]);

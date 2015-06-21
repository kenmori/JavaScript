var app = angular.module('app', ['ngResource', 'httpbackend']);
app.config(['$resourceProvider', function ($resourceProvider) {
       $resourceProvider.defaults.stripTrailingSlashes = true;
     }]);
app.controller('UserCtrl', ['$resource', '$scope',
  function($resource, $scope){
    var User = $resource('api/users/:userId', {userId: '@id'},{
      birthday: {method: 'POST', params: {year: true}}
    });
    $scope.users = User.query();
    $scope.birthday = function(user){
      user.$birthday();
    };
    $scope.save = function(user){
      user.$birthday();
    };
  }
]);

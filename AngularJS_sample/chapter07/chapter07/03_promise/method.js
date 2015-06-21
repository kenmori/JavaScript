var app = angular.module('app', []);
app.controller('PromiseMethodCtrl', ['$scope', '$q', function($scope, $q){
  function async(num){
    var deferred = $q.defer();
    setTimeout(function(){
      deferred.resolve(num+1);
    }, 1000);
    return deferred.promise;
  }

  var promise = async(10);
  promise.then(function(result){
    return result+100;
  }).then(function(result){
    console.log(result);
  });
}]);

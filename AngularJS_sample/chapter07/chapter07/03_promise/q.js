function check(name){
 return name.length < 10;
}
var app = angular.module('app', []);
app.controller('PromiseCtrl', ['$scope', '$q', '$timeout', function($scope, $q, $timeout){
  function async(name){
    var deferred = $q.defer();
    $timeout(function(){
      deferred.notify('AsyncNoti');

      if(check(name)){
        deferred.resolve('Hello, '+name);
      } else {
        deferred.reject('NG, '+name);
      }
    }, 1000);
    return deferred.promise;
  }

  var promise = async('Taro');
  promise.then(function(msg){
    console.log('Success: '+msg);
  }, function(msg){
    console.log('Error: '+msg);
  }, function(msg){
    console.log('Notification: '+msg);
  });
}]);

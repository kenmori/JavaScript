var app = angular.module('app',[]);
app.controller('WebsocketCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
  var ws = new WebSocket('ws://localhost:8181/', 'websocket');
  ws.onmessage = function(event){
    $scope.data = event.data;
    if(!$rootScope.$$phase) $scope.$apply();
  };
  ws.onopen = function(){
    $scope.send = function(msg){
      ws.send(JSON.stringify({
        message: msg
      }));
    };
  };
}]);

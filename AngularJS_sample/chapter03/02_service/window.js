var app = angular.module("app", []);
app.controller("window1", ["$scope", "$window", "$log", function ($scope, $window, $log) {
  $window.alertLog = function () {
    $window.alert("window1: " + $scope.str);
    $log.log("window1: " + $scope.str);
  };
  $scope.alertLog = $window.alertLog;
}]);
app.controller("window2", ["$scope", "$window", "$log", function ($scope, $window, $log) {
  /*
   $window.alertLog = function(){
   $window.alert("window2: "+ $scope.str);
   $log.log("window2: "+ $scope.str);
   };
   */
  $scope.alertLog = $window.alertLog;
}]);

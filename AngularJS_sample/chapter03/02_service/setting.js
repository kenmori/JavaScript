var app = angular.module('app', []);
app.controller('ServiceCtrl', ['$interval', function ($interval) {
  var num = 0;
  $interval(function () {
    console.log(num++);
  }, 1000);
}]);

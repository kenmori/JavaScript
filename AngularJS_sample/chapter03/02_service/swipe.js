var app = angular.module('app', ['ngTouch']);
app.controller('swipe', ['$scope', '$swipe', function ($scope, $swipe) {
  var touchEventHandler = function (obj, event) {
    console.log(event.type);
    console.log(obj);
  }
  $swipe.bind(angular.element(document.getElementsByTagName('body')), {
    'start': touchEventHandler,
    'move': touchEventHandler,
    'cancel': function (event) {
      console.log(event);
    },
    'end': touchEventHandler
  })
}]);

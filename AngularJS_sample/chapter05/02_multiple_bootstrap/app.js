angular.module('myApp', [])
  .controller('SampleController', function ($scope) {
    $scope.hello = "Hello, World!";
  });

angular.bootstrap(document.getElementById('myapp'), ['myApp'], 'strictDi');
angular.bootstrap(document.getElementById('myapp2'), ['myApp'], 'strictDi');

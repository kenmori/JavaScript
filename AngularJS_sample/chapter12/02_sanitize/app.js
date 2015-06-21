angular.module('app', ['ngSanitize'])
  .controller('SanitizeController', ['$scope', function ($scope) {
    $scope.dangerousHtml =
      '<h1>Title</h1>\n' +
      '<div style="background:blue">Sub Title</div>\n' +
      '<div onmouseover="this.textContent=\'mouse over!\'">click</div>\n' +
      '<script>alert(\'danger!\')</script>\n' +
      '<button onclick="alert(\'danger!\')">push</button>';

  }]);

angular.module('app', [])
  .controller('GeneralApiController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    var baseUrl = '/chapter04/01_general/';
    $scope.items = [
      'bind.js',
      'bind_partial.js',
      'bind_callback.js',
      'copy.js',
      'extend.js',
      'foreach.js',
      'tojson.js',
      'fromjson.js',
      'equals.js',
      'judge.js'
    ];

    // セレクトボックスで選択したらjsファイルを取ってきて表示
    $scope.updateCode = function () {
      $http.get(baseUrl + $scope.selectedItem)
        .success(function (data) {
          $scope.code = data;
          $scope.result = '';
        });
    };

    // コードを実行して、console.logに出力したものを表示
    $scope.run = function () {
      var console = {};
      $scope.result = '';
      console.log = function (data) {
        //$scope.result += data + '\n';
        $scope.result += angular.toJson(data) + '\n';
      };
      eval($scope.code);
    };
  }]);


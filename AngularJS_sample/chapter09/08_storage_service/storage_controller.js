angular.module('app')
  .controller('storageController', ['$scope', 'webStorage', function ($scope, webStorage) {

    // (1) Web Storageからすべてのキーを取得し、キーとwebStorageのインスタンスの組を$scope.itemsに格納する
    function updateItems() {
      $scope.items = [];
      angular.forEach(webStorage.keys(), function (key) {
        var storage = webStorage(key);
        $scope.items.push({
          name: key,
          storage: storage
        });
      });
    }

    updateItems();

    // (2) キーと値を指定してWeb Storageにデータを更新または追加する
    $scope.addItem = function (key, value) {
      var storage = webStorage(key);
      storage.set(value);
      updateItems();
    };

    // (3) Web Storageの値をすべてクリアする
    $scope.clear = function () {
      webStorage.clear();
      updateItems();
    };

    // (4) storageイベントを受け取った時に$scope.itemsを更新する
    webStorage.on(function (event) {
      updateItems();
    })
  }]);
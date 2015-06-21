describe("storage controller test", function () {

  beforeEach(module('app'));
  beforeEach(module(function ($provide) {
    // (1) $provide.decoratorを利用してwebStorageサービスを書き換える
    $provide.decorator('webStorage', function ($delegate) {
      var callbacks = [];
      // (2) webStorage.onメソッドを上書き
      $delegate.on = function (callback) {
        callbacks.push(callback);
      };

      // (3) onイベントを外部から発行できるように拡張
      $delegate.raiseEvent = function (event) {
        angular.forEach(callbacks, function (callback) {
          callback(event);
        });
      };
      return $delegate;
    });
  }));

  it("webStorage.onイベントによる更新処理", inject(function ($controller, $rootScope, webStorage) {
    var scope = $rootScope.$new();
    $controller('storageController', {$scope: scope});

    webStorage.clear();
    expect(scope.items).toEqual([]);

    var storage = webStorage('test');
    storage.set(1234);
    expect(scope.items).toEqual([]);

    // (4) イベントを発行することで、scope.itemsが更新されていることを確認
    webStorage.raiseEvent();
    expect(scope.items[0].name).toEqual('test');

  }));

});

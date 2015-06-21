function createWebStorageMock() {
  var storage = {};
  var WebStorageMock = function (key) {
    this.key = key;
  };

  WebStorageMock.prototype.get = function () {
    var value = storage[this.key];
    return angular.fromJson(value);
  };

  WebStorageMock.prototype.set = function (data) {
    var json = angular.toJson(data);
    storage[this.key] = json;
  };

  WebStorageMock.prototype.remove = function () {
    delete storage[this.key];
  };

  // WebStorageクラスのインスタンスをシエ制する関数
  var WebStorageMockFactory = function (key) {
    return new WebStorageMock(key);
  };

  WebStorageMockFactory.clear = function () {
    storage = {};
  };

  WebStorageMockFactory.keys = function () {
    var keys = [];
    for (var i = 0; i < storage.length; i++) {
      keys.push(storage.key(i));
    }
    return keys;
  };

  var callbacks = [];
  WebStorageMockFactory.on = function (callback) {
    callbacks.push(callback);
  };

  WebStorageMockFactory.raiseEvent = function (event) {
    angular.forEach(callbacks, function (callback) {
      callback(event);
    });
  };

  return WebStorageMockFactory;
}
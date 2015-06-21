angular.module('app')
  .provider('webStorage', function () {

    this.storageType = 'localStorage';
    // 生成するストレージのタイプをlocalStorageまたはsessionStorageから選択できる
    this.setStorageType = function (type) {
      this.storageType = type;
    };

    this.$get = ['$window', '$rootScope', function ($window, $rootScope) {

      if (!(this.storageType in $window)) {
        throw new Error('Storage type not supported: ' + this.storageType);
      }

      var storage = $window[this.storageType];

      // キーを指定してストレージを扱うクラス
      var WebStorage = function (key) {
        this.key = key;
      };

      WebStorage.prototype.get = function () {
        var value = storage.getItem(this.key);
        return angular.fromJson(value);
      };

      WebStorage.prototype.set = function (data) {
        var json = angular.toJson(data);
        storage.setItem(this.key, json);
      };

      WebStorage.prototype.remove = function () {
        storage.removeItem(this.key);
      };

      // WebStorageクラスのインスタンスを生成する関数
      var WebStorageFactory = function (key) {
        return new WebStorage(key);
      };

      WebStorageFactory.clear = function () {
        storage.clear();
      };

      WebStorageFactory.keys = function () {
        var keys = [];
        for (var i = 0; i < storage.length; i++) {
          keys.push(storage.key(i));
        }
        return keys;
      };

      WebStorageFactory.on = function (callback) {
        $window.addEventListener('storage', function (event) {
          $rootScope.$apply(function () {
            callback(event);
          });
        }, false);
      };

      return WebStorageFactory;
    }];
  });
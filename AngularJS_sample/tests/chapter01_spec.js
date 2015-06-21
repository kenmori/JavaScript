describe('Chapter01 基本機能の説明', function () {

  describe('Hello, World', function () {
    beforeEach(function () {
      browser.get('/chapter01/01_hello_world/index.html');
    });
    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });
    it('メッセージが表示される', function () {
      expect(element(by.binding("'Hello, World!'")).getText()).toEqual('Hello, World!');
    });
  });

  describe('テンプレートエンジン', function () {
    beforeEach(function () {
      browser.get('/chapter01/02_expression/index.html');
    });
    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });
    it('エクスプレッションが評価される', function () {
      expect(element(by.binding('1+1')).getText()).toEqual('2');
      expect(element(by.binding('variable')).getText()).toEqual('42');
    });
  });

  describe('ng-ifディレクティブ', function () {
    beforeEach(function () {
      browser.get('/chapter01/03_directive/if.html');
    });
    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });
    it('ng-ifが動く', function () {
      expect(element(by.tagName('div')).isPresent()).toBeFalsy();
      element(by.buttonText('push')).click();
      expect(element(by.tagName('div')).getText()).toEqual('Hello, World!');
      element(by.buttonText('push')).click();
      expect(element(by.tagName('div')).isPresent()).toBeFalsy();
    });
  });

  describe('ng-repeatディレクティブ', function () {
    beforeEach(function () {
      browser.get('/chapter01/03_directive/repeat.html');
    });
    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });
    it('ng-repeatが動く', function () {
      var items = element.all(by.repeater('item in items'));
      expect(items.count()).toEqual(4);
      expect(items.get(0).getText()).toEqual('AngularJS');
      expect(items.get(1).getText()).toEqual('Backbone.js');
      expect(items.get(2).getText()).toEqual('Ember.js');
      expect(items.get(3).getText()).toEqual('Knockout.js');
    });
  });

  describe('データバインディング', function () {
    beforeEach(function () {
      browser.get('/chapter01/04_data_binding/index.html');
    });
    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });
    it('双方向データバインディングが動く', function () {
      expect(element(by.binding('message')).getText()).toEqual('');
      element(by.model('message')).sendKeys('my message will be bind.');
      expect(element(by.binding('message')).getText()).toEqual('my message will be bind.');
    });
  });

  describe('コントローラー', function () {
    beforeEach(function () {
      browser.get('/chapter01/05_controller/index.html');
    });
    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });
    it('コントローラーが動く', function () {
      expect(element(by.binding('message')).getText()).toBe('Hello, World!');
      element(by.buttonText('push')).click();
      expect(element(by.binding('message')).getText()).toBe('Goodbye, Everyone!');
    });
  });

  describe('DIコンテナ', function () {
    beforeEach(function () {
      browser.get('/chapter01/06_di/index.html');
    });
    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });
    it('サービスによる計算結果が表示される', function () {
      expect(element(by.binding("x")).getText()).toEqual('46');
    });
  });
});

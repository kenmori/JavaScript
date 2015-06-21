describe('Chapter06 スコープとコントローラ', function () {

  describe('コントローラの定義', function () {
    beforeEach(function () {
      browser.get('/chapter06/01_normal_controller/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('ボタンを押したらメッセージが変わるよ', function () {
      expect(element(by.binding('message')).getText()).toBe('Hello, World!');
      element(by.buttonText('push')).click();
      expect(element(by.binding('message')).getText()).toBe('Goodbye, Everyone!');
    });
  });

  describe('スコープの範囲', function () {
    beforeEach(function () {
      browser.get('/chapter06/03_outof_scope/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('範囲外のスコープのmessageは変換しない', function () {
      element(by.model('message')).sendKeys('Hello, World!');
      expect(element(by.binding('message')).getText()).toEqual('');
    });
  });

  describe('コントローラの再利用', function () {
    beforeEach(function () {
      browser.get('/chapter06/04_multiple_controller/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('同じコントローラを複数箇所に適用すると別のスコープ', function () {
      element(by.model('message')).sendKeys('Goodbye, Everyone!');
      expect(element(by.binding('message')).getText()).toEqual('Hello, World!');
    });
  });

  describe('コントローラの階層化', function () {
    beforeEach(function () {
      browser.get('/chapter06/05_inherit_controller/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('子から親のプロパティが使える', function () {
      var parent = element(by.css('[ng-controller="ParentController"] > ul'));
      expect(parent.element(by.binding('value')).getText()).toEqual('value: parent value');
      expect(parent.element(by.binding('getUpperValue()')).getText()).toEqual('upperValue: PARENT VALUE');
      expect(parent.element(by.binding('newValue')).getText()).toEqual('newValue:');
      var child = element(by.css('[ng-controller="ChildController"]'));
      expect(child.element(by.binding('value')).getText()).toEqual('value: parent value');
      expect(child.element(by.binding('getUpperValue()')).getText()).toEqual('upperValue: PARENT VALUE');
      expect(child.element(by.binding('newValue')).getText()).toEqual('newValue: child value');
    });
  });

  describe('$rootScopeの利用', function () {
    beforeEach(function () {
      browser.get('/chapter06/08_rootscope/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('$rootScopeを利用して異なるスコープ間でデータを共有', function () {
      element(by.model('message')).sendKeys('Goodbye, Everyone!');
      element(by.buttonText('set')).click();
      expect(element(by.binding('getMessage()')).getText()).toEqual('Goodbye, Everyone!');
    });
  });

  describe('スコープとしてのコントローラの利用', function () {
    beforeEach(function () {
      browser.get('/chapter06/09_as_syntax/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('コントローラのプロパティやメソッドをスコープとして利用', function () {
      expect(element(by.binding('ctrl.value')).getText()).toEqual('value: Hello, World!');
      expect(element(by.binding('ctrl.getUpperValue()')).getText()).toEqual('upperValue: HELLO, WORLD!');
    });
  });
  describe('スコープ間連携', function () {
    beforeEach(function () {
      browser.get('/chapter06/10_event/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('emit', function () {
      element(by.model('inputText')).sendKeys('my message');
      element(by.buttonText('emit')).click();
      expect(element(by.binding('upperMessage')).getText()).toEqual('UpperMessage: my message by emit');
      expect(element(by.binding('lowerMessage1')).getText()).toEqual('LowerMessage1:');
      expect(element(by.binding('lowerMessage2')).getText()).toEqual('LowerMessage2:');
    });

    it('broadcast', function () {
      element(by.model('inputText')).sendKeys('my message');
      element(by.buttonText('broadcast')).click();
      expect(element(by.binding('upperMessage')).getText()).toEqual('UpperMessage:');
      expect(element(by.binding('lowerMessage1')).getText()).toEqual('LowerMessage1: my message by broadcast');
      expect(element(by.binding('lowerMessage2')).getText()).toEqual('LowerMessage2: my message by broadcast');
    });
  });
  describe('$watch', function () {

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('$watch', function () {
      browser.get('/chapter06/11_watch/watch.html');
      expect(element(by.binding('result')).getText()).toEqual('');
      element(by.model('message')).clear();
      element(by.model('message')).sendKeys('success');
      expect(element(by.binding('result')).getText()).toEqual('ok');
    });

    it('$watchGroup', function () {
      browser.get('/chapter06/11_watch/watch_group.html');
      expect(element(by.binding('result')).getText()).toEqual('["Hello, World!","Hello, World!","Hello, World!"]');
      element(by.model('greeting')).clear();
      element(by.model('greeting')).sendKeys('hoge');
      expect(element(by.binding('result')).getText()).toEqual('["hoge","Hello, World!","Hello, World!"]');

      element(by.model('message2')).clear();
      element(by.model('message2')).sendKeys('foo');
      expect(element(by.binding('result')).getText()).toEqual('["hoge","foo","Hello, World!"]');

      element(by.model('message3')).clear();
      element(by.model('message3')).sendKeys('bar');
      expect(element(by.binding('result')).getText()).toEqual('["hoge","foo","bar"]');
    });

    it('$watchCollection', function () {
      var button = element(by.buttonText('push'));
      var message = element(by.model('message'));
      var result = element(by.binding('result'));

      browser.get('/chapter06/11_watch/watch_collection.html');

      expect(result.getText()).toEqual('');
      message.sendKeys('a');
      button.click();
      expect(result.getText()).toEqual('');
      message.sendKeys('b');
      button.click();
      expect(result.getText()).toEqual('');
      message.sendKeys('c');
      button.click();
      expect(result.getText()).toEqual('ok');
    });
  });
});

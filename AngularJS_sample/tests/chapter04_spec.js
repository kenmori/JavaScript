describe('Chapter04 グローバルAPI', function () {

  function selectOption(options, opt_name) {
    options.filter(function (opt) {
      return opt.getText().then(function (text) {
        return text === opt_name
      })
    }).then(function (elms) {
      elms[0].click();
    });
  }

  describe('オブジェクトの操作', function () {
    var button;
    var options;
    var code;
    var result;

    beforeEach(function () {
      browser.get('/chapter04/01_general/index.html');
      button = element(by.buttonText('run'));
      options = element.all(by.options('item for item in items'));
      code = element(by.binding('code'));
      result = element(by.binding('result'));
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('bind', function () {
      selectOption(options, 'bind.js');
      button.click();
      expect(result.getText())
        .toEqual('"not bound getMessage(): undefined"\n' +
          '"bound getMessage(): Hello, World!"');
    });

    it('bind_partial', function () {
      selectOption(options, 'bind_partial.js');
      button.click();
      expect(result.getText())
        .toEqual('"add5(8): 13"');
    });

    it('bind_callback', function () {
      selectOption(options, 'bind_callback.js');
      button.click();
      expect(result.getText())
        .toEqual('undefined\n"Hello, World!"');
    });

    it('copy', function () {
      selectOption(options, 'copy.js');
      button.click();
      expect(result.getText())
        .toEqual('"destObj1: "\n{"id":"123","description":"宿題をする","dueDate":"2014-08-30T15:00:00.000Z","items":[{"name":"国語"},{"name":"数学"},{"name":"英語"}]}\n' +
          '"destObj2: "\n{"id":"123","description":"宿題をする","dueDate":"2014-08-30T15:00:00.000Z","items":[{"name":"国語"},{"name":"数学"},{"name":"英語"}]}');
    });

    it('extend', function () {
      selectOption(options, 'extend.js');
      button.click();
      expect(result.getText())
        .toEqual('{"id":"123","name":"宿題","description":"夏休みの宿題をする","dueDate":"2014-08-30T15:00:00.000Z","items":[{"name":"歴史"},{"name":"物理"}]}');
    });

    it('foreach', function () {
      selectOption(options, 'foreach.js');
      button.click();
      expect(result.getText())
        .toEqual('"name: taro"\n' +
          '"age: 17"\n' +
          '"weight: 80"\n' +
          '"values[0]: apple"\n' +
          '"values[1]: orange"\n' +
          '"values[2]: banana"\n' +
          '["0: apple","1: orange","2: banana"]');
    });

    it('tojson', function () {
      selectOption(options, 'tojson.js');
      button.click();
      expect(result.getText())
        .toEqual('"{\\"id\\":\\"123\\",\\"description\\":\\"夏休みの宿題をする\\",\\"dueDate\\":\\"2014-08-30T15:00:00.000Z\\",\\"items\\":[{\\"name\\":\\"国語\\"},{\\"name\\":\\"数学\\"},{\\"name\\":\\"英語\\"}]}"\n' +
          '"{\\n  \\"id\\": \\"123\\",\\n  \\"description\\": \\"夏休みの宿題をする\\",\\n  \\"dueDate\\": \\"2014-08-30T15:00:00.000Z\\",\\n  \\"items\\": [\\n    {\\n      \\"name\\": \\"国語\\"\\n    },\\n    {\\n      \\"name\\": \\"数学\\"\\n    },\\n    {\\n      \\"name\\": \\"英語\\"\\n    }\\n  ]\\n}"');
    });

    it('fromjson', function () {
      selectOption(options, 'fromjson.js');
      button.click();
      expect(result.getText())
        .toEqual('{"id":"123","description":"夏休みの宿題をする","dueDate":"2014-08-30T15:00:00.000Z","items":[{"name":"国語"},{"name":"数学"},{"name":"英語"}]}');
    });

    it('equals', function () {
      selectOption(options, 'equals.js');
      button.click();
      expect(result.getText())
        .toEqual('true\nfalse');
    });

    it('judge', function () {
      selectOption(options, 'judge.js');
      button.click();
      expect(result.getText())
        .toEqual('"isFunction: true"\n' +
          '"isArray: true"\n' +
          '"isObject: true"\n' +
          '"isDate: true"\n' +
          '"isDefined: true"');
    });
  });

  describe('DOMの操作', function () {

    beforeEach(function () {
      browser.get('/chapter04/02_jqlite/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('attr', function () {
      var app = element(by.id('app'));
      expect(app.getAttribute('style')).toEqual('color: red;');
    });

    it('manipulation', function () {
      var messages = element.all(by.id('message'));
      expect(messages.count()).toEqual(2);
    });

    it('traversing', function () {
      var messages = element.all(by.id('message'));
      expect(messages.get(0).getText()).toEqual('Hello, World!');
      expect(messages.get(1).getText()).toEqual('Hello, World!');
    });

    it('events', function () {
      var button = element(by.buttonText('push'));
      button.click();
      var message = element(by.id('message'));
      expect(message.isPresent()).toBeFalsy();
    });

    it('extras', function () {
      var button = element(by.buttonText('change message'));
      button.click();
      var messages = element.all(by.id('message'));
      expect(messages.get(0).getText()).toEqual('Goodbye, Everyone!');
      expect(messages.get(1).getText()).toEqual('Goodbye, Everyone!');
    });
  });

  describe('jqLiteとjQuery', function () {

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('jqlite', function () {
      browser.get('/chapter04/03_jquery/jqlite.html');
    });

    it('jquery', function () {
      browser.get('/chapter04/03_jquery/jquery.html');
    });
  });
});

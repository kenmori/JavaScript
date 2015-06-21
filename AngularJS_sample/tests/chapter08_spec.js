describe('Chapter08 カスタムフィルター', function () {

  describe('単一値のフィルター', function () {

    beforeEach(function () {
      browser.get('/chapter08/01_value_filter/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('fizzbuzz', function () {
      var fizzbuzz = element.all(by.repeater('n in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]').column('{{n | fizzbuzz}}'));
      expect(fizzbuzz.get(0).getText()).toEqual('1');
      expect(fizzbuzz.get(1).getText()).toEqual('2');
      expect(fizzbuzz.get(2).getText()).toEqual('Fizz');
      expect(fizzbuzz.get(4).getText()).toEqual('Buzz');
      expect(fizzbuzz.get(14).getText()).toEqual('Fizz Buzz');
    });
  });
  describe('配列のフィルター', function () {

    beforeEach(function () {
      browser.get('/chapter08/02_collection_filter/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('pickupNumber', function () {
      var items = element.all(by.repeater('item in items | pickupNumber').column('{{item}}'));
      expect(items.count()).toEqual(8);
      expect(items.get(0).getText()).toEqual('1');
      expect(items.get(1).getText()).toEqual('2');
      expect(items.get(2).getText()).toEqual('4');
      expect(items.get(3).getText()).toEqual('7');
      expect(items.get(7).getText()).toEqual('14');
    });
  });
  describe('オプションパラメータ', function () {

    beforeEach(function () {
      browser.get('/chapter08/03_param_filter/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('pickupNumberWithParam', function () {
      var items = element.all(by.repeater("item in items | pickupNumber:!allowOdd:!allowEven:'<':'>'").column('{{item}}'));
      expect(items.count()).toEqual(0);
      element(by.model('allowOdd')).click();
      expect(items.count()).toEqual(4);
      expect(items.get(0).getText()).toEqual('<1>');
      expect(items.get(1).getText()).toEqual('<7>');
      expect(items.get(2).getText()).toEqual('<11>');
      expect(items.get(3).getText()).toEqual('<13>');
      element(by.model('allowEven')).click();
      expect(items.count()).toEqual(8);
      expect(items.get(0).getText()).toEqual('<1>');
      expect(items.get(1).getText()).toEqual('<2>');
      expect(items.get(2).getText()).toEqual('<4>');
      expect(items.get(3).getText()).toEqual('<7>');
    });
  });
  describe('フィルターにサービスをインジェクト', function () {

    beforeEach(function () {
      browser.get('/chapter08/04_di_filter/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('fizzbuzzWithConfig', function () {
      var fizzbuzz = element.all(by.repeater('n in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15').column('{{n | fizzbuzz}}'));
      expect(fizzbuzz.get(0).getText()).toEqual('1');
      expect(fizzbuzz.get(1).getText()).toEqual('Fizz');
      expect(fizzbuzz.get(2).getText()).toEqual('Buzz');
      expect(fizzbuzz.get(4).getText()).toEqual('5');
      expect(fizzbuzz.get(5).getText()).toEqual('Fizz Buzz');
    });
  });
  describe('フィルターの組み合わせ', function () {

    beforeEach(function () {
      browser.get('/chapter08/05_unique_orderby/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('uniqueOrderBy', function () {
      var items = element.all(by.repeater('item in items | uniqueOrderBy').column('{{item}}'));
      expect(items.get(0).getText()).toEqual('1');
      expect(items.get(1).getText()).toEqual('2');
      expect(items.get(2).getText()).toEqual('4');
      expect(items.get(3).getText()).toEqual('5');
      expect(items.get(9).getText()).toEqual('Buzz');
      expect(items.get(10).getText()).toEqual('Fizz');
      expect(items.get(11).getText()).toEqual('Fizz Buzz');
    });
  });
});

describe('Chapter09 カスタムサービス', function () {

  describe('サービスの登録', function () {

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('value', function () {
      browser.get('/chapter09/01_value/index.html');
      expect(element(by.binding('MyMessage')).getText()).toEqual('MyMessage: This is my value!');
      expect(element(by.binding('MyFunc(MyValue.value1, MyValue.value2)')).getText()).toEqual('MyFunc(MyValue): 24690');
    });

    it('constant', function () {
      browser.get('/chapter09/02_constant/index.html');
      expect(element(by.binding('ConstMessage')).getText()).toEqual('ConstMessage: This is my constant!');
      expect(element(by.binding('ConstFunc(ConstValue.value1, ConstValue.value2)')).getText()).toEqual('ConstFunc(ConstValue): 112344');
    });

    it('factory', function () {
      browser.get('/chapter09/03_factory/index.html');
      expect(element(by.binding('message')).getText()).toEqual('FactoryMessage: This is my factory!');
      expect(element(by.binding('func(value.value1, value.value2)')).getText()).toEqual('FactoryFunc(FactoryValue): 33333');
    });

    it('service', function () {
      browser.get('/chapter09/04_service/index.html');
      expect(element(by.binding('message')).getText()).toEqual('ServiceMessage: This is my service!');
      expect(element(by.binding('func(value.value1, value.value2)')).getText()).toEqual('ServiceFunc(ServiceValue): 88888');
    });

    it('provider', function () {
      browser.get('/chapter09/05_provider/index.html');
      expect(element(by.binding('message')).getText()).toEqual('ProviderMessage: [This is my provider.]');
      expect(element(by.binding('func(value.value1, value.value2)')).getText()).toEqual('ProviderFunc(ProviderValue): 88888');
    });
  });

  describe('値を共有するサービス', function () {

    beforeEach(function () {
      browser.get('/chapter09/06_shared_service/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('値が共有できる', function () {
      element(by.model('value')).sendKeys('Hello, World!');
      element(by.buttonText('set')).click();
      expect(element(by.binding('getValue()')).getText()).toEqual('Hello, World!');
    });
  });

  describe('インスタンスを生成するサービス', function () {

    beforeEach(function () {
      browser.get('/chapter09/07_instanceable_service/index.html');
    });

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('サービスのインスタンスを複数作る', function () {
      element(by.model('price')).sendKeys('100');
      expect(element(by.binding('calculate5(price)')).getText()).toEqual('増税前: 105');
      expect(element(by.binding('calculate8(price)')).getText()).toEqual('増税後: 108');
    });
  });
});

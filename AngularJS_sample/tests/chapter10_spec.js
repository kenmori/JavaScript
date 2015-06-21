describe('Chapter10 カスタムディレクティブ', function () {

  describe('APIの動作確認', function () {

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });
    it('template', function () {
      browser.get('/chapter10/03_template/index.html');
      expect(element(by.tagName('pre')).getText()).toEqual('This is my first directive!');
    });
    it('templateUrl', function () {
      browser.get('/chapter10/04_template_url/index.html');
      expect(element(by.tagName('pre')).getText()).toEqual('This is my first directive!');
    });

    it('restrict', function () {
      browser.get('/chapter10/05_restrict/index.html');
      expect($('[my-directive-a] pre').getText()).toEqual('This is my Directive type A.');
      expect($('my-directive-e pre').getText()).toEqual('This is my Directive type E.');
      expect($('.my-directive-c pre').getText()).toEqual('This is my Directive type C.');
      expect($('[my-directive-m]').getText()).toEqual('This is my Directive type M.');
    });
  });

  describe('ディレクティブ', function () {

    afterEach(function () {
      browser.manage().logs().get('browser').then(function (browserLog) {
        expect(browserLog.length).toEqual(0);
      });
    });

    it('comboboxディレクティブ', function () {
      browser.get('/chapter10/20_combobox/index.html');
      element(by.model('selectedItem')).click();
      element.all(by.repeater('item in allItems').column('item')).get(1).click();
      expect(element(by.model('selectedItem')).getAttribute('value')).toEqual('未読');
    });

    it('notificationディレクティブ', function () {
      browser.get('/chapter10/21_notification/index.html');
      expect(element.all(by.repeater('item in items')).count()).toEqual(0);
      element(by.model('message')).sendKeys('my message');
      element(by.buttonText('add')).click();

      // notificationディレクティブでは内部で$timeoutを使っているので、expectでタイムアウトするまでで待ってしまう。
      // ignoreSynchronizationをtrueにしておけば待たない。
      browser.ignoreSynchronization = true;
      expect(element.all(by.repeater('item in items')).count()).toEqual(1);
      expect(element.all(by.repeater('item in items').column('item.message')).get(0).getText()).toMatch('^my message.*');

      element(by.tagName('a')).click();
      browser.ignoreSynchronization = false;
      expect(element.all(by.repeater('item in items').column('item.message')).get(0).getText()).toEqual('');
    });

    it('ratingディレクティブ', function () {
      browser.get('/chapter10/22_rating/index.html');
      element(by.tagName('input')).sendKeys('5');
      expect(element(by.tagName('rating')).getText()).toEqual('★★★★★☆☆☆☆☆');

      element.all(by.tagName('span')).get(7).click();
      expect(element(by.tagName('rating')).getText()).toEqual('★★★★★★★★☆☆');
    });

  });
});

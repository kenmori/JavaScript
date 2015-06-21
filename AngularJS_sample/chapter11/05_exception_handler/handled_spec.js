describe("filter test", function () {
  beforeEach(module('app.filter'));

  it("補足できる例外の確認", inject(function ($filter) {
    var filter = $filter('upperFilter');
    expect(function () {
      filter(123);
    }).toThrow('input type is not String.');
  }));
});

describe("fromnow filter test", function () {

  var fromnow;

  beforeEach(module('app'));
  beforeEach(inject(function ($filter) {
    fromnow = $filter('fromnow');
  }));

  it("現在時刻", function () {
    expect(fromnow(new Date())).toEqual('今');
  });

  it("10分後", function () {
    var targetDate = new angular.mock.TzDate(-9, '2014-06-26T12:03:08.000Z');
    var baseDate = new angular.mock.TzDate(-9, '2014-06-26T11:53:08.000Z');
    expect(fromnow(targetDate, baseDate)).toEqual('10分後');
  });

  it("日付をまたいだ場合", function () {
    var targetDate = new angular.mock.TzDate(-9, '2014-06-25T23:53:08.000Z');
    var baseDate = new angular.mock.TzDate(-9, '2014-06-26T00:03:08.000Z');
    expect(fromnow(targetDate, baseDate)).toEqual('10分前');
  });

  it("月をまたいた場合", function () {
    var targetDate = new angular.mock.TzDate(-9, '2014-05-26T12:03:08.000Z');
    var baseDate = new angular.mock.TzDate(-9, '2014-06-01T12:04:08.000Z');
    expect(fromnow(targetDate, baseDate)).toEqual('6日前');
  });

  it("タイムゾーンが異なる同一時刻", function () {
    var targetDate = new angular.mock.TzDate(-9, '2014-06-26T12:05:08.000Z');
    var baseDate = new angular.mock.TzDate(+0, '2014-06-26T03:05:08.000Z');
    expect(fromnow(targetDate, baseDate)).toEqual('今');
  });

});

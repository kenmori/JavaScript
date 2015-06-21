describe("timerServiceのテスト", function () {

  beforeEach(module('app'));

  it("時間経過後にメッセージが変化する", inject(function ($timeout, timerService) {
    expect(timerService.message).toEqual('まだだよ。');
    $timeout.flush();
    expect(timerService.message).toEqual('またせたな！');
  }));
});
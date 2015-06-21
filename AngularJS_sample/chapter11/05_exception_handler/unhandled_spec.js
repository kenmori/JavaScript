describe("filter test", function () {

  beforeEach(module('app.service'));
  beforeEach(module(function ($exceptionHandlerProvider) {
    // (1) 補足されない例外が発生した場合は、例外情報をログに出力する
    $exceptionHandlerProvider.mode('log');
  }));

  it("補足されない例外の発生確認", inject(function (timerService, $timeout, $exceptionHandler) {
    // (2) 例外が発生していないことを確認
    expect($exceptionHandler.errors).toEqual([]);

    // (3) 例外を発生させる
    var cancel = timerService(10000);
    $timeout.flush();

    // (4) 例外が発生したことを確認
    expect($exceptionHandler.errors[0].message).toEqual('timeout');
  }));
});

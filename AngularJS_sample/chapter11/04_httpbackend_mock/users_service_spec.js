describe('usersServiceのテスト', function () {

  beforeEach(module('app'));

  // (1) $httpBackendモックをインジェクト
  var httpBackend;
  beforeEach(inject(function ($httpBackend) {
    httpBackend = $httpBackend;
  }));

  it('ユーザ一覧が取得できる', inject(function (usersService) {
    // (2) /api/usersというURLでGETメソッドが呼び出されることを期待。またそのときのレスポンスを設定。
    httpBackend.expect('GET', '/api/users').respond([
      {userId: 123, name: 'ikezoe'},
      {userId: 100, name: 'kanai'},
      {userId: 101, name: 'yoshida'}
    ]);

    var users = usersService();
    expect(users.length).toEqual(0);
    // (3) HTTPのレスポンスを返す
    httpBackend.flush();
    expect(users.length).toEqual(3);
  }));

  afterEach(function () {
    // (4) expectで期待しているリクエストが送られてこなかった場合にテストを失敗させる
    httpBackend.verifyNoOutstandingExpectation();

    // (5) リクエストを投げたのにflushされていなかった場合にテストを失敗させる
    httpBackend.verifyNoOutstandingRequest();
  });
});
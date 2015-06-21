describe("upperFilterのテスト", function () {

  // (1) テスト対象のモジュールを読み込む
  beforeEach(module('app'));

  // (2) $filterサービスをインジェクト
  it("入力文字列が大文字に変換される", inject(function ($filter) {
    // (3) $filterサービスを利用してupperFilterを取得
    var upperFilter = $filter('upperFilter');
    // (4) upperFilterの実行結果が期待したものであることを確認
    expect(upperFilter('hello, world!')).toEqual('HELLO, WORLD!');
  }));
});

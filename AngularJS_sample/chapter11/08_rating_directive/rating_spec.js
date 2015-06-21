describe('ratingディレクティブのテスト', function () {
  var element;
  var $scope;

  beforeEach(module("app"));
  beforeEach(inject(function ($compile, $rootScope) {
    // (1) ratingディレクティブを利用したHTML要素を作成し、コンパイル処理をおこなう
    element = angular.element('<rating ng-model="rate" max="5"></rating>');
    var linkFn = $compile(element);

    // (2) スコープのインスタンスを生成し、リンク処理をおこなう
    $scope = $rootScope.$new();
    linkFn($scope);
  }));

  it('星3つです', function () {
    // (3) $digestループを実行し、初期状態の表示内容を確認
    $scope.$digest();
    expect(element.text()).toBe('☆☆☆☆☆');

    // (4) scopeに値を設定し$digestループを実行し、要素が正しく書き換わっていることを確認する
    $scope.rate = 3;
    $scope.$digest();
    expect(element.text()).toBe('★★★☆☆');

    // (5) 要素の内容を目視確認
    dump(element);
  })

});
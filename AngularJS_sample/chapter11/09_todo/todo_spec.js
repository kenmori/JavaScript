describe('ToDo Application', function () {
  var input;
  var todos;

  beforeEach(function () {
    // (1) URLを指定してテスト対象のアプリケーションのページを開く
    browser.get('/chapter11/09_todo/index.html');
    // (2) ToDo入力用のinput要素を取得
    input = element(by.model('inputText'));
    // (3) 一覧表示されるToDoの要素を取得
    todos = element.all(by.repeater('todo in todos'));
  });

  it('ToDoが追加できる', function () {
    // (4) ToDo一覧が空であることを確認
    expect(todos.count()).toEqual(0);
    // (5) 文字を入力しEnter押す
    input.sendKeys('new task!\n');
    // (6) ToDo一覧に新しいToDoが追加されていることを確認
    expect(todos.count()).toEqual(1);
    expect(todos.get(0).getText()).toEqual('new task!');
  });
});
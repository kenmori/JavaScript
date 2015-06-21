describe('HTTP通信を伴ったToDo管理アプリケーションのテスト', function () {

  beforeEach(function () {
    // (1) モックモジュールを追加する
    browser.addMockModule('httpBackendMock', function () {
      angular.module('httpBackendMock', ['ngMockE2E'])
        .run(['$httpBackend', function ($httpBackend) {
          // (2) リクエストに応じたレスポンスを設定する
          $httpBackend.when('GET', '/api/todos').respond([
            {id: 1, title: '牛乳を買う', done: false},
            {id: 2, title: '家賃を振り込む', done: true},
            {id: 3, title: '腹筋をする', done: false}
          ]);
          $httpBackend.when('POST', '/api/todos').respond(function (method, url, data) {
              data.id = 4;
              return [200, data, {}];
            }
          );
          $httpBackend.when('POST', '/api/todos/1').respond(function (method, url, data) {
              return [200, data, {}];
            }
          );
          // (3) todo.htmlの取得は、モックではなく本物のHTTP通信を利用する
          $httpBackend.when('GET', 'todo.html').passThrough();
        }]);
    })
  });

  var input;
  var todos;
  beforeEach(function () {
    browser.get('/chapter11/10_todo_with_http/index.html');
    input = element(by.model('inputText'));
    todos = element.all(by.repeater('todo in todos'));
  });

  it('ToDoの一覧が取得できる', function () {
    expect(todos.count()).toEqual(3);
  });

  it('ToDoが追加できる', function () {
    input.sendKeys('部屋の掃除をする\n');
    expect(todos.count()).toEqual(4);
    expect(todos.get(3).getText()).toEqual('部屋の掃除をする');
  });

  it('ToDoが更新できる', function () {
    // (4) 0番目のタスクのチェックボックスの要素を取得する
    var done = element(by.repeater('todo in todos').row(0))
      .element(by.model('todo.done'));
    done.click();
    expect(done).toBeTruthy();
  });

});
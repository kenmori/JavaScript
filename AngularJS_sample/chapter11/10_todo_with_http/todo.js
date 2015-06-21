angular.module('app', ['ngResource'])
  .controller('ToDoController', ['$scope', '$resource', function ($scope, $resource) {
    var ToDo = $resource('/api/todos/:id', {id: '@id'});

    $scope.add = function () {
      var newTodo = {
        title: $scope.inputText,
        done: false
      };

      ToDo.save(newTodo, function (todo) {
        $scope.todos.push(todo);
        $scope.inputText = '';
      });
    };

    $scope.update = function (todo) {
      todo.$save();
    };

    $scope.todos = ToDo.query();
  }]);
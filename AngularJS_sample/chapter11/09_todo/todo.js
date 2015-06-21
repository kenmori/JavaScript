angular.module('app', [])
  .controller('ToDoController', ['$scope', function ($scope) {
    $scope.add = function () {
      var newTodo = {
        title: $scope.inputText,
        done: false
      };

      $scope.todos.push(newTodo);
      $scope.inputText = '';
    };

    $scope.todos = [];
  }]);
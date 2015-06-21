var app = angular.module('app', []);

app.directive("myDirective", function () {
  return{
    template: "<span>{{ctrl.message}}</span>",
    controller: function () {
      this.message = "Hello, World!";
    },
    controllerAs: "ctrl"
  }
});
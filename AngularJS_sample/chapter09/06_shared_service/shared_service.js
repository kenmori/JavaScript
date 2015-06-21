var app = angular.module('app');

app.service('SharedService', function () {

  this.values = {};
  this.setValue = function (key, value) {
    this.values[key] = value;
  };
  this.getValue = function (key) {
    return this.values[key];
  }
});

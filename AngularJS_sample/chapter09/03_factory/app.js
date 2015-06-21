var app = angular.module('app', ['ngResource', 'ngMockE2E']);

app.run(['$httpBackend', function ($httpBackend) {
  $httpBackend.whenGET('main.html').passThrough();
  $httpBackend.whenGET('/api/products.json?api_key=fae2e2a0-f906-11e3-a3ac-0800200c9a66').respond(
    [
      {id: 123, value: 'a'},
      {id: 124, value: 'b'},
      {id: 125, value: 'c'}
    ]
  );
}]);

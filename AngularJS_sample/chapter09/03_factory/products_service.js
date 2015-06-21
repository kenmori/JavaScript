var app = angular.module('app');

// APIの情報をサービスとして定義
app.constant('apiUrl', '/api/products.json');
app.constant('apiKey', 'fae2e2a0-f906-11e3-a3ac-0800200c9a66');

// $resourceをラップしたサービスを定義
app.factory('productsService',
  ['$resource', 'apiUrl', 'apiKey',
    function ($resource, apiUrl, apiKey) {
      return $resource(apiUrl).query({api_key: apiKey});
    }]);
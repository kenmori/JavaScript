angular.module('app', [])
  .run(['$rootScopeProvider', function ($rootScopeProvider) {
    $rootScopeProvider.digestTtl(30);
  }]);
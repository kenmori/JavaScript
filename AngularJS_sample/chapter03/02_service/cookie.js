var app = angular.module('app', ['ngCookies']);
app.controller('cookie', ['$cookies', '$cookieStore', function ($cookies, $cookieStore) {
  $cookieStore.put("test", "change");
  $cookieStore.get("test");
  $cookieStore.remove("test");
}]);

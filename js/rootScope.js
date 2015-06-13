var app = angular.module('app', []);
app.controller('scope1', ['$rootScope', '$scope', function($rootScope, $scope){
	$scope.test = 'test1';
	$rootScope.rootTest = "rootTest1";
}]);
app.controller('scope2', ['$rootScope', '$scope', function($rootScope, $scope){
	$scope.test = 'test2';
	$rootScope.rootTest = "rootTest2";
}]);

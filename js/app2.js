var MyController = function($scope){
	$scope.message = "moritasann";
	$scope.action = function(){
		$scope.message = "sayonara";
	}
}
appModule = angular.module('app',[]);
appModule.controller('myController',MyController);

var app = angular.module('app', []);
app.controller('interval', ['$scope', '$interval', function($scope, $interval){
	var count = 0;
	$scope.count = count;
	$interval(function(){
		$scope.count = count ++;

	},100,100);
}]);

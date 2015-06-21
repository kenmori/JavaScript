var app = angular.module("scheduler", ["ngTouch"]);
app.controller("schedulerCtrl", ["$scope", "$rootScope", function($scope, $rootScope){
  var now = new Date();
  $rootScope.select = {
    year: now.getFullYear(),
    month: now.getMonth()+1
  };
  $scope.years = [];
  $scope.months = [];
  for(var year = now.getFullYear(); year >= 2000; year--){
    $scope.years.push(year);
  }
  for(var month = 1; month <= 12; month++){
    $scope.months.push(month);
  }
  $scope.nextMonth = function(){
    //左スワイプで次月を表示
    $scope.select.month += 1;
    if($scope.select.month > 12){
      $rootScope.select.year += 1;
      $rootScope.select.month = 1;
    }
    $rootScope.changeSelect();
  };
  $scope.prevMonth = function(){
    //右スワイプで前月を表示
    $scope.select.month -= 1;
    if($scope.select.month == 0){
      $rootScope.select.year -= 1;
      $rootScope.select.month = 12;
    }
    $rootScope.changeSelect();
  };
}]);
app.directive("appCalender", function(){
  return {
    restrict: "E",
    scope: "=",
    templateUrl: "partials/calender.html",
    controller: "calenderCtrl",
    link: function(scope, element, attrs){
      scope.changeSelect();
    }
  };
});
app.controller("calenderCtrl", ["$scope", "$rootScope", function($scope, $rootScope){
  $scope.toggle = function(event){
    var $el = angular.element(event.currentTarget);
    if($el.parent().hasClass("open")){
      $el.parent().removeClass("open");
    } else {
      $el.parent().addClass("open");
    }
  };
  $scope.changeSelect = function(){
    var startDate = new Date($rootScope.select.year, $rootScope.select.month-1, 1).getDate();
    var endDate = new Date($rootScope.select.year, $rootScope.select.month, 0).getDate();
    $scope.days = [];
    for(var d = startDate; d <= endDate; d++){
      $scope.days.push({
        schedules : []
      });
    }
  };
  $rootScope.changeSelect = $scope.changeSelect;
  $scope.createSchedule = function(day){
    day.schedules.push({
      content: day.input
    });
    day.input = "";
  };
}]);

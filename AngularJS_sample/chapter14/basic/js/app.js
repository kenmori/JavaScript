var app = angular.module("scheduler", []);
app.controller("schedulerCtrl", ["$scope", "$rootScope", function($scope, $rootScope){
  var now = new Date();
  //コントローラ間のやりとりのため$rootScopeに値を設定
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
}]);
app.directive("appCalender", function(){
  //カレンダー用のdirectiveを作成
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
  //カレンダー用コントローラー
  $scope.toggle = function(event){
    //スケジュールを追加するとデータが隠れるため、タップで表示できるようにする
    var $el = angular.element(event.currentTarget);
    if($el.parent().hasClass("open")){
      $el.parent().removeClass("open");
    } else {
      $el.parent().addClass("open");
    }
  };
  $scope.changeSelect = function(){
    //年月を変更した時にカレンダーを変更
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
    //スケジュールを追加
    day.schedules.push({
      content: day.input
    });
    day.input = "";
  };
}]);

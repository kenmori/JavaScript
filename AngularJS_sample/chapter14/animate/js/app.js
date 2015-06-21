var app = angular.module("scheduler", ["ngTouch", "ngAnimate"]);

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
  $rootScope.animation = "top";
  $scope.nextMonth = function(){
    $scope.select.month += 1;
    if($scope.select.month > 12){
      $rootScope.select.year += 1;
      $rootScope.select.month = 1;
    }
    $rootScope.animation = "left";
    $rootScope.changeSelect();
  };
  $scope.prevMonth = function(){
    $scope.select.month -= 1;
    if($scope.select.month == 0){
      $rootScope.select.year -= 1;
      $rootScope.select.month = 12;
    }
    $rootScope.animation = "right";
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
app.animation('.schedulePane', function($rootScope){
  //スケジュール用アニメーションを追加
  return {
    enter: function(element, done){
      //カレンダーを表示する際にで段階的に表示されるアニメーション
      var $ele = $(element);
      //出始めの位置を日にちで変える
      var move = 1000 * $ele.data("index") + 1000;
      var setupCss = {
        position: 'relative',
        opacity: 0
      };
      setupCss[$rootScope.animation] = move;
      var doneCss = {
        position: 'relative',
        opacity: 1
      };
      doneCss[$rootScope.animation] = 0;
      $ele.css(setupCss);
      $ele.animate(doneCss, 1000, done);
      return function(cancelled){
        if(cancelled){
          //処理がキャンセルされた場合はアニメーションをストップ 
          $ele.stop();
        }
        if($ele.data("last")){
          $rootScope.animation = "top";
        }
      };
    }
  };
});

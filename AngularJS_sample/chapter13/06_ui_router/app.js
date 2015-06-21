angular.module('app', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('state1', {
          url: "/state1",
          views: {
            "viewA": { templateUrl: "state1.viewA.html" },
            "viewB": { templateUrl: "state1.viewB.html" }
          }
        })
        .state('state2', {
          url: "/state2",
          views: {
            "viewA": { templateUrl: "state2.viewA.html" },
            "viewB": { templateUrl: "state2.viewB.html" }
          }
        });

      $urlRouterProvider.otherwise("/state1");
    }]);

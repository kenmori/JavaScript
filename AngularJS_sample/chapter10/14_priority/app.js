angular.module('app', [])
  .directive('pri1', function () {
    return {
      priority: 1,
      compile: function () {
        console.log(1);
      }
    }
  })
  .directive('pri2', function () {
    return {
      priority: 2,
      compile: function () {
        console.log(2);
      }
    }
  })
  .directive('pri3', function () {
    return {
      priority: 3,
      compile: function () {
        console.log(3);
      }
    }
  })
  .directive('pri4', function () {
    return {
      priority: 4,
      compile: function () {
        console.log(4);
      }
    }
  });

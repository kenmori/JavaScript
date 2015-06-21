angular.module('app', [])
  .directive('compileLinkOrder', function () {
    return {
      restrict: 'E',
      compile: function (tElement, tAttrs, tTransclude) {
        var name = tAttrs.name;
        console.log(name + ':compile');
        return {
          pre: function preLink() {
            console.log(name + ':preLink');
          },
          post: function postLink() {
            console.log(name + ':postLink');
          }
        }
      }
    }
  });

angular.module('app', [])
  .filter('pickupNumber', function () {
    return function (values, denyOdd, denyEven, prefix, suffix) {
      if (!angular.isArray(values)) {
        return value;
      }
      prefix = prefix || '';
      suffix = suffix || '';
      var newValues = [];
      angular.forEach(values, function (v) {
        if (angular.isNumber(v) && !(denyOdd && v % 2 == 1) && !(denyEven && v % 2 == 0)) {
          newValues.push(prefix + v + suffix);
        }
      });

      return newValues;
    };
  });
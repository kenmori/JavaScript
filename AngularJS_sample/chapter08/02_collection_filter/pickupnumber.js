app.filter('pickupNumber', function () {
  return function (values) {
    if (!angular.isArray(values)) {
      return value;
    }
    var newValues = [];
    angular.forEach(values, function (v) {
      if (angular.isNumber(v)) {
        newValues.push(v);
      }
    });

    return newValues;
  };
});

app.filter('uniqueOrderBy', ['$filter',
  function createUniqueOrderByFilter($filter) {
    return function uniqueOrderBy(values, exp, reverse) {
      if (!angular.isArray(values)) {
        return value;
      }
      var unique = $filter('unique');
      var orderBy = $filter('orderBy');

      var uniqueValues = unique(values);
      return orderBy(uniqueValues, exp || angular.identity, reverse);
    };
  }]);
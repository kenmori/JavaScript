$http({method: 'GET', url: '/api/xhr'})
  .then(function success(result) {
    var statusCode = result.status;
    var data = result.data;
  });

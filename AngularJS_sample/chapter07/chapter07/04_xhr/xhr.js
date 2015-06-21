$http({method: 'GET', url: '/api/xhr'})
  .success(function success(data, status, headers, config) {
    //成功時に呼び出されるコールバック
  })
  .error(function error(data, status, headers, config) {
    //失敗時に呼び出されるコールバック
  });

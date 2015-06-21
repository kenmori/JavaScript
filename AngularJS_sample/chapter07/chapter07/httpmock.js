var mock = angular.module('httpbackend', ['ngMockE2E']);
mock.run(function($httpBackend) {
  var users = [{"id": 1, "name": "Taro", "year": 15},
               {"id": 2, "name": "Jiro", "year": 14},
               {"id": 3, "name": "Saburo", "year": 13},
               {"id": 4, "name": "Shiro", "year": 12},
               {"id": 5, "name": "Goro", "year": 11}];
  $httpBackend.whenPOST(/api\/users/).respond(function(method, url, data){
    if(/year=true/.test(url)){
      var uu = url.match(/users\/([0-9]+)/);
      var id = 1;
      if(uu){
        id = uu[1];
      }
      users = users.map(function(user){
        if(user.id == id){
          user.year++;
        }
        return user;
      });
      var u = angular.fromJson(data);
      u.year++;
    } else {
      var u = angular.fromJson(data);
      u.id = users.length+1;
      users.push(u);
    }
    return [200, u, {}];
  });
  $httpBackend.whenGET(/api\/users$/).respond(function(){
    return [200, users, {}];
  });
  $httpBackend.whenGET(/api\/users/).respond(function(method, url, data){
    var id = url.split("/")[3];
    var user = users.filter(function(user){
      return user.id == id;
    });
    return [200, user[0], {}];
  });
  $httpBackend.whenPUT(/api\/users/).respond(function(method, url, data){
    var u = angular.fromJson(data);
    users = users.map(function(user){
      if(user.id == u.id){
        user = u;
      }
      return user;
    });
    return [200, u, {}];
  });
  $httpBackend.whenDELETE(/api\/users/).respond(function(method, url, data){
    var id = url.split("/")[3];
    users = users.filter(function(user){
      return user.id != id;
    });
    return [200, users, {}];
  });
  $httpBackend.whenGET(/api\/data/).respond(function(){
    return [200, {angular: 'js'}, {}];
  });
});

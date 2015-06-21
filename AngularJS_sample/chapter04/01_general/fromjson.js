var json = '{ "id": "123", "description": "夏休みの宿題をする", "dueDate": "2014-08-30T15:00:00.000Z", "items": [ { "name": "国語" }, { "name": "数学" }, { "name": "英語" } ] }';
var obj = angular.fromJson(json);
console.log(obj);
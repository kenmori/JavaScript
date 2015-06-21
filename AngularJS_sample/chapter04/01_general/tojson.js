var o1 = {
  id: '123',
  description: '夏休みの宿題をする',
  dueDate: new Date('2014/08/31'),
  items: [
    {name: '国語'},
    {name: '数学'},
    {name: '英語'}
  ]
};
var json = angular.toJson(o1, false);
console.log(json);
var prettyJson = angular.toJson(o1, true);
console.log(prettyJson);

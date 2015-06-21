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
var o2 = {
  dueDate: new Date('2014/08/31'),
  items: [
    {name: '国語'},
    {name: '数学'},
    {name: '英語'}
  ],
  description: '夏休みの宿題をする',
  id: '123'
};
var o3 = {
  id: '123',
  description: '夏休みの宿題をする',
  dueDate: new Date('2014/08/31'),
  items: [
    {name: '英語'},
    {name: '数学'},
    {name: '国語'}
  ]
};
// (1) 連想配列の場合は要素の順番が異なっても同じとオブジェクトであると判断される
console.log(angular.equals(o1, o2));
// (2) 配列の要素の順番が異なる場合は、異なるオブジェクトであると判断される
console.log(angular.equals(o1, o3));

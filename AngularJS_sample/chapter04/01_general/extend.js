var destObj = {
  id: '456',
  name: '宿題'
};

var srcObj1 = {
  id: '123',
  description: '夏休みの宿題をする',
  dueDate: new Date('2014/08/31'),
  items: [
    {name: '国語'},
    {name: '数学'},
    {name: '英語'}
  ]
};
var srcObj2 = {
  items: [
    {name: '歴史'},
    {name: '物理'}
  ]
};


// destObjにsrcObj1とsrcObj2のプロパティを追加
angular.extend(destObj, srcObj1, srcObj2);
console.log(destObj);

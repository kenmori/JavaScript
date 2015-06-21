var srcObj = {
  id: '123',
  description: '宿題をする',
  dueDate: new Date('2014/08/31'),
  items: [
    {name: '国語'},
    {name: '数学'},
    {name: '英語'}
  ]
};

// (1) srcObjをdestObj1にコピー
var destObj1 = angular.copy(srcObj);

// (2) srcObjをdestObj2にコピー(categoryはなくなります)
var destObj2 = {
  category: '宿題'
};
angular.copy(srcObj, destObj2);

// ディープコピーされているので、srcObjを変更してもdestObjは変化しない
srcObj.items.push({name: '物理'});

console.log('destObj1: ');
console.log(destObj1);
console.log('destObj2: ');
console.log(destObj2);

## Ramda


```js
const interview_flow = {
  id: 1,
  title: '求人1',
  flow: [
    { name: '面談1'},
    { name: '面談2'},
  ],
};
```
#### オブジェクトがもつ配列内のオブジェクトを参照する


[lensPath](https://ramdajs.com/docs/#lensPath)

````
[Idx] → Lens s a
Idx = String | Int
Lens s a = Functor f => (a → f a) → s → f s
```

文字列か数値を要素(参照する階層を表している)にもつ配列を渡し実行するとLens型を返す

```js
const lensP = lensPath(["flow", 1,  "name"])
view(lensP, interview_flow);
//面談2
```


### mapしたい

[map](https://ramdajs.com/docs/#map)

````
Functor f => (a → b) → f a → f b
```
fanctor関数(それぞれの要素に処理を適応させる関数)を渡し、処理対象の参照を渡すと
適応させたオブジェクトを返す

```js

//propはgetter関数
const interview_flow = {
  id: 1,
  title: '求人1',
  flow: [
    { name: '面談1'},
    { name: '面談2'},
  ],
};
```
const functor = (obj) => obj.name + "fafa"
map(functor, prop("flow", interview_flow))
//["面談1fafa", "面談2fafa"]

```


mapで適応させる要素にindexを適応させたい

```js

const functor = (obj, i) => obj.name + `_${i + 1}`
const addIndexedMap = addIndex(map)
addIndexedMap(functor, prop("flow", interview_flow))

//["面談1_1", "面談2_2"]

```



[reject](https://ramdajs.com/docs/#reject)

Filterable f => (a → Boolean) → f a → f a

```js
let arr = [undefined, null, ,,, 6]
```
こちらを[6]だけ取得したい

```js
const arr = [undefined, null, ,,, 6];
const filterFalsy = (e) =>  e == null;
reject(filterFalsy, arr)
//[6]
```

[https://goo.gl/QXa6Bb](https://goo.gl/QXa6Bb)


Arrayかどうかを評価

```js
const isObject = R.compose(R.equals('Array'), R.type);
isObject(["a" , "b", "c"])
```


オブジェクトidをkeyにするオブジェクトを返す

```js
const current = [{id: 1, start: "2018-05-20-1900"},{id: 2, start: "2018-05-20-1800"},{id: 3, start: "2018-05-20-2000"}]
const objFromListWith = R.curry((fn, list) => R.chain(R.zipObj, R.map(fn))(list))

objFromListWith(
  R.prop('id'),
  current
)

//{
//  "1": { "id": 1, "start": "2018-05-20-1900"},
//  "2": { "id": 2, "start": "2018-05-20-1800"},
//  "3": {"id": 3, "start": "2018-05-20-2000"}
// }
```





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







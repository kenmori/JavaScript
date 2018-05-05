## ざっくり理解するflowType


### $ElementType<T,K>

Tに渡した型のkeyを指定Kに指定するとその型になる

```js
type obj = {
  name: string,
  age: number
}

("kenji": $ElementType<obj, "name">)//ok!

```

### $Diff<Props, DefaultProps>

```js
$Diff<A, B>

Aはprops
Bはdefaultprops

このdefaultPropsにあるpropertyはPropsには必須。
渡ってこなくてはいけない。
propsに増える分は許容される

またPropを送らない表現ができる
$Diff<{}, {nope: number}> //Error
$Diff<{}, {nop: number | void}> //ok
```

### $ElementType<T, K>
$PropertyType<T, K>との違いはKはany型
$PropertyTypeはliteral型でなければならない

### Exact<T>
$Exact<{name | string}>は{|name: string|}と同等
他のプロパティを持っていないことを保証する

例えば下の例だと、jobプロパティも許容される
type Obj = {
  name: string,
  age: number
}
const hoge = (obj: Obj) => {}
hoge({name: "kenji", age: 37, job: "engineer"})//ok

プロパティを決める場合には
$Exact<Obj>を使う

```js
type Obj = {
  name: string,
  age: number
}
type B = $Exact<Obj>
const hoge = (obj: B) => {}
hoge({name: "kenji", age: 37, job: "engineer"})>//Error!にしてくれる
hoge({name: "kenji", age: 37})>//ok

[flow playground](https://flow.org/try/#0C4TwDgpgBA8gRgKygXigbwFBSgOwIYC2EAXFAM7ABOAljgOYA0WUedJuArgXBJRgL4ZQkKACEUUACQBRAB54AxsAA88BAD4MCgPY4KUABba2EgBTbEpUQEoU69IIxG2ptPiKkARAGsIOBNSeDCxspADMAOz81kA)

//or
$Exact<Obj>は
type Obj = {|name: string, age: number|} でも同じ意味


NOTICE
Object spreadを使う際に$Exactを使う際に注意が必要だったが今は治っている
問題提起
https://qiita.com/stomita/items/24a7d223acdc6a8715f4
issue
https://github.com/facebook/flow/issues/2405




```




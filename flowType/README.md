## ざっくり理解するflowType

### ?

## Optional object type properties

```js
{foo?: string}
{}, {foo:undefined}, {foo: "kenji"}//work

{foo: null}//Error
```
### Optional Parameters

valueにはundefined, matchする型が指定されている(nullは禁止)
```js
funtion method(value?: string){
  //
}

method();
method(undefined);
method("string")
method(null)//error

```



### Union types

関数内ではそれぞれの実引数のtypeに対応し、返り値のstringに変換して返すようにしなくてはならない
```js
function ee(value: string | boolean | number):string{
  if(typeof value === "string"){
    return value;
  } else if(typeof value === "boolean") {
    return String(value)
  } else if(typeof value === "number"){
    return String(value);
  } else {
    return ""
  }
}
```

入ってくるかわからないものを扱うことはできない
```js
{success: true, value: false}
{success: false, error: "bad"}
これらを一つのtypeで処理しようとすると。。
type Response = {
  success: boolean,
  value?: boolean,
  error?: string
};

function handleResponse(response: Response) {
  if (response.success) {
    var value: boolean = response.value; // Error!
  } else {
    var error: string = response.error; // Error!
  }
}
私たちはpropertyの存在がわかるが、flowはわからない

二つのtypeを一つに結合していることによって引き起こされる
分けることでどちらの値を使っているかFlowに教えてあげる
type Success = {success: true, value: boolean}
type Failed = {success: false, error: string}

type Response = Success | Failed



```


結合されていない結合では、
各オブジェクトタイプを区別するために単一のプロパティを使用する必要があります。
2つの異なるオブジェクトを異なるプロパティで区別することはできません。
```js
type Success = { success: true, value: boolean };
type Failed  = { error: true, message: string };

function handleResponse(response:  Success | Failed) {
    if (response.success) {
  // $ExpectError
    var value: boolean = response.value; // Error!
    }
} } }

```

下記のようにtype Objectが期待する以上に渡すことができる(width subtyping)ため

```js
handleResponse({
  success: true,
  error: true,
  value: true,
  message: 'hi'
});
```
FlowはFailedの方にもvalueが渡ってくる可能性があると推論する
Flowはお互いのtypeのpropertyが衝突しない限り比べる方法がない

exact object typeで追加のプロパティを許さないようにすればok
```js
type Success = {| success: true, value: boolean |};
type Failed  = {| error: true, message: string |};

type Response = Success | Failed;

function handleResponse(response: Response) {
  if (response.success) {
    var value: boolean = response.value;//ok
  } else {
    var message: string = response.message;//ok
  }
}
```


## generic type

```js
function somemethod(a){
    return a
}
add("kenji");

```
こちらにstring型をつけると
```js
function somemethod(a:string):string {
  return a
}
```
文字列を結合して返すものしか使えなくなる
その場合
```js
function somemethod<T>(a:T):T{
  return a
}
add("kenji")
add(3)
```
どっちの型もいける
渡す型が決まっていない場合使える

またgenericsは一旦私た型の追跡をする

下の例はvalueが置き換わっていて、T型が保証されていないのでErrorになっている
```js
function identity<T>(value: T): T {
  return "foo"; // Error!
}

function identity<T>(value: T): T {
  value = "foo"; // Error!
  // $ExpectError
  return value;  // Error!
}
```

ジェネリクスはunkowntype持つ。refineするようにしないといけない
```js
function obj<T>(obj: T): T {
    return obj
}
obj({bar: "aa", foo: "bb"});
```
を
````js
function obj<T>(obj: T): T {
  if(obj && obj.foo){//refine
    return obj
  }
  return obj
}
```
にするがどんな型でも許してしまう

```js

function obj<T:{foo: string}>(obj: T): T {
  console.log(obj.foo)//refineが取れた
  return obj
}

obj({foo: "foo", bar: "bar"})//work 追加パラメータは許されている型
obj({bar: "bar"})//Error fooが入っていない
```

ジェネリクスは型が使われた返り値も関心があるので下記の場合Errorを出す
```js
function identity<T: number>(value: T): T {
    return value;
}

let one: 1 = identity(1);
let two: 2 = identity(2);
// $ExpectError
let three: "three" = identity("three");
```

Prameterized generics
下のtype alias は使う時に型を決めている(Item<string>箇所)。関数に引数を渡すみたいに
```js
type Item<T> = {
  prop: T,
}

let item: Item<string> = {
  prop: "value"
};
```

下記の例はparametearize genericsにdefaultParameterを追加している

```js
type Item<T: number = 1> = {
    prop: T,
};
let foo: Item<> = { prop: 1 };
let bar: Item<2> = { prop: 2 };
```

### intersection type

```js
type A = { a: number };
type B = { b: boolean };
type C = { c: string };

function method(value: A & B & C) {
    // ...
}
method({ a: 1 }); // Error!
method({ a: 1, b: true }); // Error!
method({ a: 1, b: true, c: 'three' }); // Works!
```
Impossible intersection type
下記は number型でstring型な型を指定しているがそんなものないので必ずエラーになる。
(こういうこともできてしまう)
```js
type NumberAndString = number & string;
```

また同じ名前のプロパティを持ち型が違う場合もErrorになる
```js
type One = {prop: number};
type Two = {prop: boolean};

type Both = One & Two;
var value: Both = {
  prop: 1//Error
}

type One = {prop: number};
type Two = {foo: boolean};
type Both = One & Two;
var value: Both = {prop: 1, foo: false}//ok


```
Array Type

配列の要素にnullを許容する時
```js

//?Type[]は?Array<T>と同じ
let arr1: ?number[] = null;//ok
let arr2: ?number[] = [1,2];//ok
let arr3: ?number[] = [null];//Error

//(?T[])
let arr1: (?number)[] = null //Error
let arr2: (?number)[] = [1,2]
let arr3: (?number)[] = [null]//ok
let arr4: (?number)[] = [undefined]//ok
```

下記のように要素がundefineの可能性がある場合

```js
let array: Array<number> = [0, 1, 2];
let value: number = array[3]//work //but undefined
//or
let array: Array<number> = [];
array[0] = 0;
array[2] = 2;

let value : number = array[1];//works //but undefined
```

この場合
```js`

let array: Array<number> = [0, 1, 2];
let value: number | void = array[1];
if(value !== undefined){
}
```
と対応する。Flowは将来これをよりスマートにしようとしているが
今の所これで対応してほしいとのこと


### Tuple Types

```js

```

### $Call<F>
Fに渡した関数の呼び出し結果の型


最初何をしているかわからなかった下記
```js
type ExtractPropType = <T>({prop: T}) => T;
type Obj = {prop: number};
type PropType = $Call<ExtractPropType, Obj>;
type Nope = $Call<ExtractPropType, {nope: number}>;
```

Function.prototype.call(this, arg)を$Call<F, arg>でやっている
this.はFunctionType。この場合ExtractProptype
引数としてObjを渡している型。PropType。
PropTypeはnumber型が返ってくる型になる




```js
```


```js
```

```js
```



```js
```

```js
```

```js
```

```js
```

### Function type with generics

```js
function method (fn: <T>(param:T) => T){
  ///some
}
```


### restParameter

### %checks


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

Aに含まれているものでBに含まれないもプロパティが必須になる



またPropを送らない表現ができる
$Diff<{}, {nope: number}> //Error
$Diff<{}, {nop: number | void}> //ok
```


### Object

indexer

keyに型を持たせることができる

```js
type user = {[string]: string};
var obj = {name: "kenji"}//ok
```
何が嬉しいか

keyにドキュメントの目的で「オプショナリーネーム」を持たせてる
```js
type user = {[userName: string]: string};
var obj = {name: "kenji"}//ok
```

とか参照時の型を制御できる

```
obj["name"] = "fafa"//ok
obj[0] = "fafa"//error。keyはstringで参照しなくてはいけません
```
存在しないプロパティにアクセスしても型エラーにはならない(実行時にはエラーになる)

```js
var o:{[number]: string} = {};
o[42].length

type user = {name: number, [id:number]: string}

var obj:user = {name: 200, [222]: "eee"}

```



### $Shape<T>

Tとの違い

```js

type T = {
 a: string,
 b: number
}

const a:T = {a: "string"}//TはError。満たしていないため
const a:$Shape<T> = {a: "string"} //ok

const a:T = {a:"string", b: 89, c:"kenji"}//ok width spreadを許す
const a:$Shape<T> = {a:"string", b: 89, c:"kenji"}// Error　許さない

```

使い所

```js
type O = {
 name: string,
 id: number
}
function add(o: O):O {
 return o;
}

渡す際に
add({name: "fafa", id: 40, add:"fafafa"})//Oだとok
余分なものは渡して欲しくない。。。


function add(o: $Shape<O>):O {
 return o;
}

add({name: "fafa", id: 40, add:"fafafa"})//error

add({name: "fafa", id: 40})
or
add({id: 40})//ok
or
add({name: "fafa"})//ok

少ないのも増えるのも嫌な場合
Exact Object TypeかUtilityの$Exact

```
### UnionType

一つのtypeの中で存在するかわからないプロパティを分岐処理する場合Errorを起こす
type O = {a: string, isOpen?:boolean, isClose?: boolean}
var o = {a:"fafa", isOpen: true}

const func = (o: O) =>{
 if(o.isOpen){
   return o.isOpen
 } else if(o.isClose) {
   return o.isClose
 }
}

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
```
NOTICE
Object spreadを使う際に$Exactを使う際に注意が必要だったが今は治っている
[https://qiita.com/stomita/items/24a7d223acdc6a8715f4](問題提起)
[https://github.com/facebook/flow/issues/2405](issue)

---

### maybe型を使用する際に
nullやundefinedが入っていた場合下記の方法だと最後のフィルターでerrorを起こす

````
type A = Array<?number>
const a: A = [1,2,3];
a.filter((n)=>{n != null}).filter(n => n >0)>

```

回避策

```js
type A = Array<?number>
const a: A = [1,2,3];
a.filter(Boolean).filter(n => n > 0)
```

### intersection

下記の場合Errorになる
```js`
type Foo = {| foo: string |} & {| bar: string |}
const example: Foo = {foo: 'foo', bar: 'bar'}
```
A & Bは Aが満たされる時Fooはfooしかもてず、Bが満たされる場合foo
が持てないのでError
```js
type Foo = {| foo: string, bar: string |}
```
なら動くが、違う方法の表現の仕方は。。。
```js
type Foo = {| foo: string |};
type Bar = {| bar: string |};
type FooBar = { ...Foo, ...Bar };//ok

or

type Foo = {| ...{| foo: string |}, ...{| bar: string |} |}
const example: Foo = {foo: 'foo', bar: 'bar'}
```




```


### $ElementType<T, K>
$PropertyType<T, K>との違いはKはany型
$PropertyTypeはliteral型でなければならない


```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```


参照
[https://github.com/facebook/flow/issues/2846](https://github.com/facebook/flow/issues/2846)


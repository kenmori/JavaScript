## Redux 構造に対して型付けしていく

### 背景

Flow で型付けしていったそれと何が違うのか、また使えるユーティリティなどがあるのか実例を示しながら追って行いきたい

### Do's and Don'ts

[https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

#### Callback Types

callback の返り値に any を指定しないこと

```ts
fn(x: () => any){
    x()
}
```

なぜか

void にしておけば 返さないので事故的に何か返していた場合、戻り値が any になれば ok になる

```ts
function fn(x: () => void) {
  var k = x(); // oops! meant to do something else
  k.doSomething(); // error, but would be OK if the return type had been 'any'
}
```

コールバック関数の中で少なくとも意味がわかるまでオプショナル引数を使うな

```ts
/* WRONG */
interface Fetcher {
  getObject(done: (data: any, elapsedTime?: number) => void): void;
}
```

多分書いた人はコールバック内の`elapsedTime`が渡って来ないことを気にしているが、問題ない
「より少ない引数を受け取るコールバック」は常に合法です

オプショナルなしで書こう

```ts
interface Fetcher {
  getObject(done: (data: any, elapsedTime: number) => void): void;
}
```

### Overloads and Callbacks

コールバックの引数が違うだけでオーバーライドするな

```ts
/* WRONG */
declare function beforeAll(action: () => void, timeout?: number): void;
declare function beforeAll(
  action: (done: DoneFn) => void,
  timeout?: number
): void;
```

コールバックが持つ最大の引数で書きましょう

```ts
declare function beforeAll(
  action: (done: DoneFn) => void,
  timeout?: number
): void;
```

理由：コールバックがパラメータを無視することは常に合法的なので、より短いオーバーロードを行う必要はありません。
短いコールバックを最初に指定すると、
最初のオーバーロードと一致するため、
誤って型指定された関数を渡すことができます。

### Function Overloads

より一般的なシグネチャを記述的なそれより前におくな

```ts
/* WRONG */
declare function fn(x: any): any;
declare function fn(x: HTMLElement): number;
declare function fn(x: HTMLDivElement): string;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: any, wat?
```

TypeScript は関数呼び出し時に最初にマッチしたオーバーライドを選ぶので、any だと最初に必ずマッチしてしまう

```ts
/* OK */
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)
```

### Use Optional Parameters

```ts
interface Example {
  diff(one: string): number;
  diff(one: string, two: string): number;
  diff(one: string, two: string, three: boolean): number;
}
```

可能な限りオプショナルを使おう

返り値が同じ時の場合だけ

```ts
/* OK */
interface Example {
  diff(one: string, two?: string, three?: boolean): number;
}
```

・y が少なくとも x と同じメンバを持つ場合互換性があると判断される
仮引数が x(受け取る側)、実引数が y(渡すがわ)の場合

・引数が異なる関数の代入
引数の数は関係ない。代入元が代入先のパラメータを持っていること

```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // エラー

// example
type f = (name: string, n: number) => void;
let fa: f = (value: string) => {
  //実装は使わないでもokだが
  console.log("ddd");
};
fa("fafaf", 2); //渡す際に満たさないといけない

// with interface
interface f {
  (name: string, n: number): void;
}
let fa: f = (value: string, aa) => {
  console.log("ddd");
};
fa("fafaf", 2);

//use Type Parameter∏
interface f {
  <T>(name: T, n: T): void;
}

let fa: f = (value, aa) => {
  console.log("ddd");
};
fa("fafa", "fafa");

// if length
interface f {
  <T>(name: T[], n: T[]): void;
}

let fa: f = (value, aa) => {
  let fae = value.length;
  console.log("ddd");
};
fa(["fafa"], ["fafa"]);

// share
interface f {
  <T>(name: T[], n: T[]): void;
  <T>(name, n): void;
}
let fa: f = (value, aa) => {
  let fae = value.length;
  console.log("ddd");
};
fa("fafa", "fafa");
```

・返り値が異なる関数の代入
代入先の返り値は代入元の返り値に全て含まれていること

```ts
let x = () => ({ name: "Alice" });
let y = () => ({ name: "Alice", location: "Seattle" });

x = y; // OK
y = x; // エラー。xの戻り値には location プロパティがない
```

Generic に型を指定しないと any が与えられる

```ts
let identity = function<T>(x: T): T {
  // ...
};

let reverse = function<U>(y: U): U {
  // ...
};

identity = reverse; // OK。(x: any)=>any は (y: any)=>any と互換性がある
```

### リテラル型と型推論

[https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a)

```ts
const a = "foo"; //"foo"型
const b: "bar" = a; //Error "foo型が入っていると推論される"

//letの場合は型が決まらない

let a = "foo"; //"foo型"
const b: string = a; //letの場合は推論はプリミティブ型(String型)に範囲が変わる
const c: "foo" = a; //Error Type 'string' is not assignable to type '"foo"'.

//letの時も型注釈をつければリテラル型になる
let a: "foo" = "foo";
a = "bar"; //Error
```

### オブジェクト型

```ts
interface MyObj {
  //オブジェクト型に名前をつける
  foo: string;
  bar: number;
}

const a: MyObj = { foo: "foo", bar: 3 };
const a = { foo: "foo", bar: 3 }; //この場合でもオブジェクト型として型推論してくれる
```

求めている型に対して代入するオブジェクトのプロパティの型が違うとき
求めている型に対して代入するオブジェクトのプロパティが足りてないとき

Error

```ts
interface MyObj {
  foo: string;
  bar: number;
}

interface MyObj2 {
  foo: string;
  ee: number;
}

const a: MyObj = { foo: "foo", bar: 3 };
const b: MyObj2 = a; //オブジェクト型。MyObjはMyObj2の要件を満たす部分型(MyObj2が要求するプロパティを全て持つ)なので代入可能

//オブジェクトリテラルの場合は違う
//オブジェクトリテラル型は余計なプロパティを持つと弾かれる

const b: MyObj2 = { foo: "foo", bar: 3 };
// エラー:
// Type '{ foo: string; bar: number; }' is not assignable to type 'MyObj2'.
//  Object literal may only specify known properties, and 'bar' does not exist in type 'MyObj2'.

//関数の引数の場合でも同じ。オブジェクトリテラル型が渡っているかオブジェクト型が渡っているかで違う
interface MyObj2 {
  foo: string;
}
// エラー:
// Argument of type '{ foo: string; bar: number; }' is not assignable to parameter of type 'MyObj2'.
//  Object literal may only specify known properties, and 'bar' does not exist in type 'MyObj2'.
func({ foo: "foo", bar: 3 });

function func(obj: MyObj2): void {}
```

### 関数型

型の引数名は実装の引数名と一致してなくてもいい。

関数の部分型

```ts
interface MyObj {
  foo: string;
  bar: number;
}

interface MyObj2 {
  foo: string;
}

const a: (obj: MyObj2) => void = () => {};
const b: (obj: MyObj) => void = a; //代入しようとしているaの引数のオブジェクト型(MyObj2)を渡そうとしている。
//MyObjはMyObj2の部分型(受け取るプロパティを自分自身の一部分として持っている)なのでok

const a: (arg: number) => void = () => {};
const b: (arg: number, arg2: string) => void = a; //ok 引数の受け取る数が違う関数はaも呼び出すことができる
//引数を2つ受け取る関数として使うことが可能であるということです。これは、関数の側で余計な引数を無視すればいいので。

//当然ok
const a: (arg: number, arg2: string, arg3: string) => void = () => {};
const b: (arg: number, arg2: string, ee: string) => void = a;

//代入された後で実行じ引数の数を間違えないように
const f1: (foo: string) => void = () => {};
// エラー: Expected 1 arguments, but got 2.
f1("foo", 3);
```

### void 型

```ts
//1. return文がない、何も返さない関数
//2. return文はあるが、値がない
```

場合 undefined が返る。

### クラス型

・class Foo と同時に Foo 型が作られる
・クラス型は下記のようにオブジェクト型で代替可能

```ts
interface MyFoo {
  method: () => void;
}
class Foo {
  method(): void {
    console.log("Hello, world!");
  }
}

const obj: MyFoo = new Foo();
const obj2: Foo = obj;
```

### タプル型

可変長タプル型は最後に使う

````ts
(number, ...string[])

### never 型

実行されることがない switch 文の default

・Error を throw して返り値が帰ってこない場合の変数代入先への型注釈

```ts
function func(): never {
  throw new Error("Hi");
}

const result: never = func();
````

TypeScript では関数の返り値の型は推論されるので書く必要はない

### intersection 型

```ts
//関数に渡した先でif文で分岐する必要がある
```

#### 関数同士の union

関数同士の union を考える時結果の関数の引数は元々の関数の引数同士の intersection 型を持つ必要がある

```ts
type StrFunc = (arg: string) => string;
type NumFunc = (arg: number) => string;

//どちらが入ってくるか分からない
declare const obj: StrFunc | NumFunc;
// エラー: Argument of type '123' is not assignable to parameter of type 'string & number'.
//        Type '123' is not assignable to type 'string'.

// どちらの関数を呼び出しているか分からないので渡す引数はどちらの関数でも実行できるような引数を渡す必要がある
obj(123);
```

解決例

```ts
interface Hoge {
  foo: string;
  bar: number;
}
interface Piyo {
  foo: string;
  baz: boolean;
}

type HogeFunc = (arg: Hoge) => number;
type PiyoFunc = (arg: Piyo) => boolean;

declare const func: HogeFunc | PiyoFunc;

// resは number | boolean 型
const res = func({
  foo: "foo",
  bar: 123,
  baz: false
});
```

このような intersection 型を要求されているエラーが出た場合
どちらが入ってくるか分からないので、string | number ではなく代入元はどちらも含んでいる必要がある

```ts
function f1(obj) {
  return obj.str;
}

function f2(obj) {
  return obj.num;
}

const f = f1;
const res = f({ str: "string" });
>>>>>>> add type intersection
```

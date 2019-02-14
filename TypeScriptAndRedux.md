## Redux 構造に対して型付けしていく

### 背景

Flow で型付けしていったそれと何が違うのか、また使えるユーティリティなどがあるのか実例を示しながら追って行いきたい

### Do's and Don'ts

[https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

概要
interface のなかでオーバーライドする際は

- Number, String, Boolean, or Object を使うな(代わりに number, string, boolean, object を使え)
- 引数の数だけ違う場合 オプショナルを使え (それだけで違う関数型をオーバーライドしない)
- ある引数だけの型が違う場合 ユニオンタイプを使え(それだけで違う関数型をオーバーライドしない)
- 返り値の型が違う場合オーバーライドする
- オーバーライドする順番は厳密 -> ゆるくする (TS はマッチしたところで検索をやめるため)
- コールバック関数の戻り値に any を指定せず void を使え (戻り値で何かする場合にチェックされなくなるため)
- コールバックの引数分だけオーバーライドするな (オプショナルやユニオンタイプ記述しろ)
- コールバック内の引数はオプショナルを使わず、最大で受け取る引数分だけ片付けしろ

object 型・・・`number, string, boolean, symbol, null, or undefined` 以外と互換性がある

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

### ?:省略可能なプロパティ

?をつけたプロパティは渡ってこない可能性があるので自動的に `undefined | number`　 の union 型になる
ので使うときは undefined チェックする必要がある

```ts
interface MyObj {
  name: string;
  age: number | undefined;
}

let obj: MyObj = {
  name: "kenji"
};
//Property 'age' is missing in type '{ name: string; }' but required in type 'MyObj'.
```

?を使わない場合は存在はしていないといけない

```ts
interface MyObj {
  name: string;
  age?: number | undefined;
}

let obj: MyObj = {
  name: "kenji"
};
```

### 解決例

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
```

### 疑問点

### Example

parameter が多くなった場合

```ts
Generally, you just return an object with multiple properties, one of which contains your function. Something like this:

var foo = function (val1 : string){
    // do something

    return {
        k1: 22,
        k2: 33
    };
}
You could also make it implement an interface, so you know what to expect as the returned object.

interface IFoo {
    (val1: string): INumbers;
}
interface INumbers {
    k1 : number;
    k2 : number;
}
var foo : IFoo = (val1 : string){
    // do something

    return {
        k1: 22,
        k2: 33
    };
}
```

メソッドオーバーライドしたいと思った時の考慮

[https://www.stevefenton.co.uk/2013/02/what-is-wrong-with-method-overloads-in-typescript/](https://www.stevefenton.co.uk/2013/02/what-is-wrong-with-method-overloads-in-typescript/)

```ts
```

React x Redux x TypeScript

[https://medium.com/swinginc/react-redux-typescript-into-the-better-frontend-tutorial-d32f46e97995]()https://medium.com/swinginc/react-redux-typescript-into-the-better-frontend-tutorial-d32f46e97995

[https://qiita.com/murank/items/588eaddfe8af59914658](https://qiita.com/murank/items/588eaddfe8af59914658)

特定のエラーだけ無視するコメントアウト

```ts
//@ts-ignore
```

[https://codeburst.io/five-tips-i-wish-i-knew-when-i-started-with-typescript-c9e8609029db](https://codeburst.io/five-tips-i-wish-i-knew-when-i-started-with-typescript-c9e8609029db)

[https://definitelytyped.org/guides/best-practices.html](https://definitelytyped.org/guides/best-practices.html)

### 型アサーション

[https://docs.solab.jp/typescript/class/assertion/](https://docs.solab.jp/typescript/class/assertion/)

```ts
class Foo {
  public foo: string = "Foo";
}

class Bar extends Foo {
  public bar: string = "Bar";
}

function factory(type: string) {
  if (type == "Foo") {
    return new Foo();
  } else {
    return new Bar();
  }
}

// factoryには返り値の型指定がない。この場合どちらも代入可能なFooが推論される

var foo = factory("Bar");
if (foo instanceof Bar) {
  var bar: Bar = <Bar>foo;
}
```

### <T extends Example> は型制約(「T は Example のサブタイプでなければならない」の意味)

```ts
interface FooInterface1 {
  foo1(): string;
}

class FooClass1 implements FooInterface1 {
  public foo1(): string {
    return "foo1";
  }
}

interface FooInterface2 {
  foo2(): string;
}

class FooClass2 implements FooInterface2 {
  public foo2(): string {
    return "foo2";
  }
}

// 型パラメータ T に 制約 extends FooInterface1 を追加
class Bar<T extends FooInterface1> {}

var bar1 = new Bar<FooClass1>();

// FooClass2 は FooInterface1 のサブタイプではないのでコンパイルエラー
var bar2 = new Bar<FooClass2>(); //Error Type 'FooClass2' does not satisfy the constraint 'FooInterface1'.
//Property 'foo1' is missing in type 'FooClass2' but required in type 'FooInterface1'.
```

### sybtyping

構造上同じなら互換性がある
・private を持っている場合は同じでもコンパイルエラー

[https://docs.solab.jp/typescript/object/subtyping/](https://docs.solab.jp/typescript/object/subtyping/)

```ts
type Foo = {
  x: string;
  y(): void;
};

class Bar {
  public x: string;
  public y(): void {}
  public z(): void {}
}

var result: Foo = new Bar();
```

```ts
type Foo = {
  x: string;
  y(): void;
};

var obj = {
  x: "fafa",
  y() {},
  name: ""
};
var result: Foo = obj;
```

```ts
type Foo = {
  x: string;
  y(): void;
};

var obj = {
  x: "fafa",
  y() {},
  name: ""
};
function F(obj: Foo) {
  return obj;
}
F(obj);
```

### アンビエント宣言

TypeScript コンパイラに JavaScript ライブラリが静的型付けされることを伝えるため

その宣言ソースファイルが `*.d.ts`

```ts
declare module "fooModule" {
  export function bar(): string;
}

import m = require("fooModule");
var result5 = m.bar();
```

```txt
//https://docs.solab.jp/typescript/ambient/declaration/

TypeScript では console.log などを呼び出してもコンパイルエラーにはなりません。 これは、TypeScript コンパイラがデフォルトで lib.d.ts という宣言ソースファイルを利用しており、 lib.d.ts には次のようなアンビエント宣言が記述されているためです。

// lib.d.ts
declare var console: Console;
```

### why

[Why am I getting an error “Object literal may only specify known properties”?](https://stackoverflow.com/questions/31816061/why-am-i-getting-an-error-object-literal-may-only-specify-known-properties)

```ts
interface Foo {
  name: string;
}

class Foo2 implements Foo {
  name = "string";
  age = 29;
}

let obj: Foo = { name: "fafaf", age: 90 };
// Type '{ name: string; age: number; }' is not assignable to type 'Foo'.
//  Object literal may only specify known properties, and 'age' does not exist in type 'Foo'.
```

to fix

```ts
const other = { name: "fafaf", age: 90 };
let obj: Foo = other;
```

or

```ts
let obj: Foo = <Foo>{ name: "fafaf", age: 90 };
```

or

```ts
//何が入ってくるかわからない場合
interface Foo {
  name: string;
  [other: string]: any; //here
}

class Foo2 implements Foo {
  name = "string";
  age = 29;
}

let obj: Foo = { name: "fafaf", age: 90 };
```

**type assersion**

追加のプロパティは型チェックをしない。時に使う

```ts
interface Options {
  x?: string;
  y?: number;
}

// Error, no property 'z' in 'Options'
let q1: Options = { x: "foo", y: 32, z: 100 }; //通常

// OK
let q2 = <Options>{ x: "foo", y: 32, z: 100 }; //<T>v or v as T
let q3 = { x: "foo", y: 32, z: 100 } as Options;

// Still an error (good):
let q4 = <Options>{ x: 100, y: 32, z: 100 };
```

#### 型推論 2

[Type Inference in TypeScript](https://basarat.gitbooks.io/typescript/docs/types/type-inference.html)

これだけで推論は行われる。foo はリテラル型として。

```ts
let foo = {
  a: 123,
  b: 456
};
foo.a = "hello"; //Type '"hello"' is not assignable to type 'number'.

//destructuring

let foo = {
  a: 123,
  b: 456
};
let { a } = foo;
foo.a = "hello"; //Type '"hello"' is not assignable to type 'number'.

//ex1 これだとfooは型推論できない。なぜならパラメータに型づけされてないので何が起こるかわからないからだ
const foo = (a, b) => {
  /* do something */
};

//この場合
type TwoNumberFunction = (a: number, b: number) => void;
const foo: TwoNumberFunction = (a, b) => {
  /* do something */
};

//こうすることで推論できる

//ex2 関数の戻り値は型推論が行われるが、期待している型ではないかもしれない

//これは anyになって帰って来ます
function foo(a: number, b: number) {
  return a + addOne(b);
}

// Some external function in a library someone wrote in JavaScript
function addOne(a) {
  return a + 1;
}
//なぜならaddOneへの型定義は弱いからです
// a が anyで addOne
```

### Type Compatibility

```ts
const str = "Hello";
str = "fafafa";
```

**extra information is ok**

this is raiging error

```ts
interface Foo {
  name: string;
}
let obj: Foo = { name: "fafaf", age: 90 };
```

```ts
interface Foo {
  name: string;
}
interface Foo2 {
  name: string;
  age: number;
}
let obj2: Foo2 = { name: "fafaf", age: 90 };
let obj: Foo = obj2; //extra info is ok
```

#### ex4

```ts
function f(obj: { a: number; b: string }) {
  return obj;
}

f({ a: 3, b: "", c: "fafaf" });
//Argument of type '{ a: number; b: string; c: string; }' is not assignable to parameter of type '{ a: number; b: string; }'.
//Object literal may only specify known properties, and 'c' does not exist in type '{ a: number; b: string; }'.
```

interface vs Types

[TypeScript の Interface と Type alias の比較](https://qiita.com/tkrkt/items/d01b96363e58a7df830e)

- 同じ型名が存在する場合 merge される interface, エラーになる types
- MappedType が使えない interface, 使える Types (インデックスシグネチャ型ではどちらも使える)
- 交差型、共用体型が使える types, 使えない interface
- 規定しないプロパティの扱いが interface は他にもあるものとして扱う、types は存在していないものとして扱う

### keyof

# [https://qiita.com/Quramy/items/e27a7756170d06bef22a](https://qiita.com/Quramy/items/e27a7756170d06bef22a)

### 改善

from

```ts
export interface IBaseInfo {}
export interface IMyInfo extends IBaseInfo {
  name: string;
}
function testA(): IBaseInfo {
  var result: IMyInfo = { name: "Hey!" };
  return result;
}
```

to

```ts
export interface IBaseInfo {}
export interface IMyInfo extends IBaseInfo {
  name: string;
}
function testA<T>(a: T): T {
  return a;
}

let fafa = testA<IMyInfo>({ name: "key" });
```

### 1

これだと string になってアサインできない

```ts
type Fruit = "Orange" | "Apple" | "Banana";

let myString: string = "Banana";

let myFruit: Fruit = myString; //Type 'string' is not assignable to type 'Fruit'.
```

キャストする

```ts
let myString: string = "Banana";

let myFruit: Fruit = myString as Fruit;
```

### 2

```ts
interface IBaseInfo {}
interface E extends IBaseInfo {
  name: string;
}

let a: E = { name: "fafa" };

let b: IBaseInfo = a; //継承元にはアサインが可能。aはbのsubtypeだから

let cc: IBaseInfo = { name: "fafa" };
//let c: E = cc //Error Property 'name' is missing in type 'IBaseInfo' but required in type 'E'.
let c: E = cc as E;
```

### 宿題

```ts
export interface IBaseInfo {}
export interface IMyInfo extends IBaseInfo {
  name: string;
}

var kk: IMyInfo = { name: "key" };
function testA<IMyInfo>(): IMyInfo {
  var e = { name: "key" };
  return e; //Type '{ name: string; }' is not assignable to type 'IMyInfo'.
}

let fafa = testA<IMyInfo>();
```

[https://qiita.com/Quramy/items/e27a7756170d06bef22a](https://qiita.com/Quramy/items/e27a7756170d06bef22a)

### Return Type

代入先は少なくとも代入元のメンバーを含んでいないといけない

```ts
/** Type Hierarchy */
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/** Two sample functions */
let iMakePoint2D = (): Point2D => ({ x: 0, y: 0 });
let iMakePoint3D = (): Point3D => ({ x: 0, y: 0, z: 0 });

/** Assignment */
iMakePoint2D = iMakePoint3D; // Okay
iMakePoint3D = iMakePoint2D; // ERROR: Point2D is not assignable to Point3D
```

Number of Arguments

少ない分には OK

```ts
let iTakeSomethingAndPassItAnErr = (x: (err: Error, data: any) => void) => {
  /* do something */
};

iTakeSomethingAndPassItAnErr(() => null); // Okay
iTakeSomethingAndPassItAnErr(err => null); // Okay
iTakeSomethingAndPassItAnErr((err, data) => null); // Okay

// ERROR: Argument of type '(err: any, data: any, more: any) => null' is not assignable to parameter of type '(err: Error, data: any) => void'.
iTakeSomethingAndPassItAnErr((err, data, more) => null);
```

### unknown type

[TypeScript 3.0.0-RC 変更点](https://qiita.com/vvakame/items/57a0559c45b88b2ae168)

```ts
```

### ts

[https://github.com/Microsoft/TypeScript/pull/21847](https://github.com/Microsoft/TypeScript/pull/21847)

```ts
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">; //type T00 = "b" | "d"
```

# https://github.com/Microsoft/TypeScript/pull/21316

### 言葉

- 相対インポートと非相対インポート
- Classic 検索と Node 検索のモジュール解決時の検索方式の違い ([https://qiita.com/murank/items/5f11466474d49498bbd5#node](https://qiita.com/murank/items/5f11466474d49498bbd5#node))
- baseUrl ・・・非相対で import されているファイルは全てここの url の相対パスとして扱われる。この値が相対パスの場合 tsconfig からの相対。コマンドラインはカレントからの相対になる

### module

`y`は`export`されていないので参照すると Error になる

```ts
module MyModule {
  export var x: number = 0;
  var y: number = 100;
}
```

module をドットで繋ぐと下層のフィールドは`export`されたことになる
以下は同じ

```ts
module MyModule {}
module MyModule.MyNestedModule {}

//と

module MyModule {
  export module MyNestedModule {}
}
```

### Do

if value is global

if global value is read-only. use const.
if global value is block scope. use let.

```ts
//declare var foo: number
console.log("Half the number of widgets is " + foo / 2);
```

自作の myLib が greeting という関数と countNumber という回数がわかるプロパティを持つ場合

```ts
declare namespace myLib {
  function greeting(str: string): void;
  let count: number;
}
```

同じ関数が返り値の型が違う場合

```ts
let x: Wiget = getWidget(43);
let x: Wiget[] = getWidget("fafafa");

declare function getWiget(n: number): Widget;
declare function getWiget(s: string): Widget[];
```

### declaretion merging

[https://www.typescriptlang.org/docs/handbook/declaration-merging.html](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
・interface はプロパティが同じ場合のちに書いたものが順番を変えてマージされる

```ts
interface Name {
  get(name: string): string;
}
interface Name {
  get(age: number): number;
}

//result
interface Name {
  get(age: number): number;
  get(name: string): string;
}
```

・interface は同じ名前の同じメソッドの場合、シグネチャのプロパティがリテラルのオーバーロードが上にくる

```ts
interface Document {
  createElement(tagName: any): Element;
}
interface Document {
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
}

//result
interface Document {
  createElement(tagName: "canvas"): HTMLCanvasElement;
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
  createElement(tagName: string): HTMLElement;
  createElement(tagName: any): Element;
}
```

### namespace

interface と同じだが、

- もし同じ namespace 名を作るならすでに存在している namespace のメンバーを export しなく
  てはいけない
- 同じ名前の namespace はマージされるが
  non-export member は original namespace しか参照できない
  merge 後の namespace からは見れないことを意味する

既存の namespace と新規の namesspace が同取っていく合
新規の namespace は新規の namespace の export-member を取っていく

- namespace で既存の class と同じ名前にすると export されている値だけ merge され、
  static メンバーとして既存のクラスから呼び出しができる
  存在する class に static メンバーを追加する際に使う

- namespace で既存の function と同じ名前にすると body の中で参照できるプロパティを追加できる

```ts
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
}

console.log(buildLabel("Sam Smith"));
```

- namespace で既存の enum と同じ名前にすると enum に対して static member を拡張できる

### Module Augmentation

・既存の module に対して、prototype などを使って関数を独自の実装にアップデートする場合、TS にお知らせしなくてはいけない

```ts
import { Observable } from "./observable";
Observable.prototype.map = function(f) {
  // ... another exercise for the reader
};
```

オーバーロードする

```ts
//override
declare module "./observable" {
  //ここがmodule augmentation
  interface Observable<T> {
    map<U>(f: (x: T) => U): Observable<U>;
  }
}
Observable.prototype.map = function(f) {
  // ... another exercise for the reader
};
```

### Global augmentation

すでに実装されている declaretions に対して module の内側からグローバルに追加できる

```ts
declare global {
  interface Arra<T> {
    toObservale(): Obserable<T>;
  }
}
```

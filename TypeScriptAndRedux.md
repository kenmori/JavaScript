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

//use Type Parameter
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

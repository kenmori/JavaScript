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

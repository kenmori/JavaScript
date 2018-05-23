
Enzymeとは
・ライブラリ
・React componentに対してのユニットテスト、utility functionを提供している(shallow renderringのような)
・Enzymeはどのテストランナーとも共存できる(Enzymeはテストランナーではない)
・React TestUnitのようなライブラリをラップしたもの
・JSDOMやCheerIOなどユニットテストを記述するためのシンプルなインターフェイスをもつ
・Enzyme自体がアサーションライブラリを持っていなく、ただUnitテストのAPIコレクションを提供している


Jest
・フレームワーク
・テストランナーやアサーションライブラリをもつ
・ユニットテストケースとは異なる実行を可能にする
・コンソールログやログファイルに結果を書き、モックや全てのアサーションを短めに証明

・Enzyme 3 は react16をサポートしている


ユニットテストとは
・関数のテストとDOM操作する機能のテストがある
例えば

```js
//関数のテスト・・・期待する値が返ってくるか
funciton add(a, b) { return a + b}
//アサーションライブラリとフレームワークでいけるテスト

DOM操作する機能のテスト・・・DOMが正しく追加されているか
//<ul></ul> → <ul><li>追加されました</li></ul>
//ブラウザを介するのでテストランナーが必要
```


Topレベルに記述する

```js
import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Foo from '../Foo';
```
#### 概要

| 名前 | 使い所 | やる人 |
|:-----------|------------:|:------------:|
| アサーション | 〇〇は××である | assert, chai, power-assert |
| フレームワーク | テスト実行 & 便利キット一式 | Mocha, Jasmine |
| テストランナー | ブラウザを介したテスト | Jest, Karma |
| テストツール(テストダブル) | 用途に応じて | sinon.js |


#### テストフレームワーク
・テストコードを効率よく書くためのもの

```js
if(add(1,2) == 3){
 console.log("テスト結果Ok")
}
```

などのコードを書いてテストするのがきついので簡単にかけるようにAPIを提供している
・どんなテストに成功、失敗して
・全体どれだけテストがあってどれだけパスしたか
・失敗した場合、なぜ失敗したか
を解決するためにあるのがテストフレームワーク

#### テストダブル

・関数の中から関数を呼ぶ際に引数がちゃんと渡っているかなど調べたい時など複雑な実行の際に使うもの
・テストフレームワークと一緒に使われる。標準で付いているものもある

#### アサーションライブラリ
・テスト結果を見やすく出力することに特化した機能を持つものをアサーションライブラリと呼ぶ
・テストフレームワークと一緒に使われる

#### テストランナー(タスクランナー)
テストを書いただけでは
実行できないのでテストを実行する奴が必要
実行場所は？
JSの場合ブラウザ上。
テストを実行するにあたりブラウザ以外の場所でJSを動かす必要がある
NodeJS。
NodeJSを利用してテストを実行する

ただDOMのテストがしたい
コマンドから起動して自動でテストをしてくれるのがテストランナー(タスクランナー)
・ブラウザにテスト対象のコードを読み込ませ自動テストを実施してくれる

#### ヘッドレスブラウザ
画面が描画されないブラウザ
代表的なのはPhantomJS
テストランナーではブラウザの描画は必要ないのでこれを使う選択もできる




場合



#### テストランナー

Jestのsnapshotのみを使う場合を除きJestのrendererは必要ない
https://github.com/airbnb/enzyme/blob/master/docs/guides/jest.md



参照

[JavaScriptテスト自動化キホンのキ](https://qiita.com/y-tsuna/items/6b8b824e444030070754)
[2016-12-05
一から始めるJavaScriptユニットテスト](http://developer.hatenastaff.com/entry/2016/12/05/102351)
https://stackoverflow.com/questions/42616576/what-is-the-difference-between-jest-enzyme?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

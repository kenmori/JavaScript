# AngularJSリファレンス

* 池添 明宏, 金井 健一, 吉田 徹生
* インプレス刊行（http://www.impressjapan.jp/books/1114101042/）

## サンプルプログラムの実行

### 事前準備

1. 本書「Chap.13 ツール」の内容にしたがい、Node.jS/npmとgruntをインストールしてください。
2. シェル（もしくはコマンドプロンプト）を開き、本サンプルプログラムのディレクトリに移動します。
3. 次のコマンドを実行して、テストの実行に必要なツールをインストールします。
  $ npm install
4. 次のコマンドを実行して、Selenium Serverの更新を行ないます。
  $ ./node_modules/protractor/bin/webdriver-manager update

### サンプルプログラムの実行

1. シェル（もしくはコマンドプロンプト）を開き、本サンプルプログラムのディレクトリに移動します。
2. 次のコマンドを実行して、サンプルアプリケーションを実行します。
  $ grunt serve
3. ブラウザで http://localhost:9000/index.html にアクセスしてください。

### サンプルプログラムのテスト

1. シェル（もしくはコマンドプロンプト）を開き、本サンプルプログラムのディレクトリに移動します。
2. 次のコマンドを実行して、Selenium Serverを起動します。
  $ ./node_modules/protractor/bin/webdriver-manager start
3. 次のコマンドを実行して、テストを実行します。
  $ grunt test

## ライセンス

本サンプルコードに含まれるJavaScriptファイルおよびHTMLファイル、CSSファイルはすべてMITライセンスとします。
利用しているライブラリやツールのライセンスについては、それぞれのライセンスを参照してください。

* AngularJS
  * https://angularjs.org/
  * MITライセンス

* Angular-UI
  * http://angular-ui.github.io/
  * MITラインセンス

* Jasmine
  * http://jasmine.github.io/
  * MITライセンス

* Protractor
  * https://github.com/angular/protractor
  * MITライセンス

* Karma
  * http://karma-runner.github.io/
  * MITライセンス

* Grunt
  * http://gruntjs.com/
  * MITライセンス

* Topcoat
  * http://topcoat.io/
  * Apache License 2.0

* D3.js
  * http://d3js.org/
  * 修正BSDライセンス

* jQuery
  * http://jquery.com/
  * MITライセンス

* Bootstrap
  * http://getbootstrap.com/
  * MITライセンス

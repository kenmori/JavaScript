# 環境変数(UnixやNode)周りの話

index

- nodeの環境変数
- process.envとは、何か、なぜ、いつ、どのように、効果的に使うのか
- ブラウザの中での環境変数の取り方
- 環境変数の表示
- 実験
- What is the difference between process.env.USER` and `process.env.USERNAME in Node?
- /etc/profileと$HOME/.profileとshell起動時の挙動
- npm script
- 便利モジュール
- その他
- 参照

---

## Understanding Environment Variables and the Unix Path

cat,grepのプログラミングの名前をタイプする際
shellはPATHの中に書かれているディレクトリに対してプログラム実行ファイルを探しに行きます
PATH、それ自体は環境変数です(他の共通の```EDITOR```や```JAVA_HOME```などを含んできる)
環境変数はshellのセッション中に生存できるグローバル変数で、shellがショートカットや優先を指定するのに役立ちます

あなたは動的に```export```を使って、環境変数を設定できたり、永続的に```~/.bash_profile``` or ```~/.bashrc```ファイル
に設定できます
例えば
vimを実行するために$EDITORと```.bash_profile```上で使います
このように

```
$ export EDITOR=vim
$ $EDITOR ~/.bash_profile
export PATH=$PATH:/something/i/need/to/add
export NEW_ENVIRONMENT_VARIABLE=value`
```
環境変数はshellのセッションが開始された際に```.bash_profile```から読み込まれ
ファイルが保存された後、その変更を影響させる前に新しいターミナルウィンドゥを立ち上げる必要があります

- A Primer on bash

```bash```はOS XやLinux上での標準shellです
bashはインタラクティブshellでありスクリプト言語の両方です
後述の例題のケースはbash scriptsと呼ばれています

```~/.bash_profile```は実際はbashが開始されるとき毎に実行されます。あなたが新しいターミナルを開いたときはいつも。

bash構文にちょっとだけ親しんでみましょう

- bash Prompt Conventions

```$```はbashプロンプトを示すためにドキュメントの中でよく使われます
ターミナルで何かをタイプするべきことを示めすこれを頻繁に見るだろう

なので```$```をタイプしないでください

```
$ export EDITOR=vim
```

exportされる変数名は大文字にされないと悪いことが起きるかもしれない。


Basic bash Syntax

WIP






## nodeの環境変数

nodeでいう環境変数
グローバル変数とすることもできるが、
nodeの環境変数は実行する特定のプロセスで頻繁に利用する変数です

Webapplicationを持っていたら
```PORT、DBCONECTION、JAVA_HOME```
の脈絡の中では ```environment variables```
は「設定」のようなものだが、

nodeの環境変数はハードコードしたくない情報を渡すための手段です。

では、
nodeアプリの中で定義できて読み込む様々な方法を示しましょう

```
PORT=65534 node bin/www
```
nodeを実行する時このように指定でき

```
const port = process.env.PORT
```

で取得できるが、

複数の作る必要がある際に実行が見づらくなります。

例えば、

```
PORT=65534 DB_CONN="mongodb://react-cosmos-db:swQOhAsVjfHx3Q9VXh29T9U8xQNVGQ78lEQaL6yMNq3rOSA1WhUXHTOcmDf38Q8rg14NHtQLcUuMA==@react-cosmos-db.documents.azure.com:19373/?ssl=true&replicaSet=globaldb" SECRET_KEY=b6264fca-8adf-457f-a94f-5a4b0d1ca2b9  node bin/www
```
のように。


なので```.env``` ファイルを使います。

例えば、

```
PORT=65534
DB_CONN="mongodb://react-cosmos-db:swQOhAsVjfHx3Q9VXh29T9U8xQNVGQ78lEQaL6yMNq3rOSA1WhUXHTOcmDf38Q8rg14NHtQLcUuMA==@react-cosmos-db.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
SECRET_KEY="b6264fca-8adf-457f-a94f-5a4b0d1ca2b9"
```

このように。
設定したものをルートに置き

読み込むちょっとしたオプションもあるが
一番簡単にenvファイルを読み込む方法は

```dotenv```
を使う方法です。


どこからでもそれを使えるようにpackage.jsonに必須にします


```
npm install dotenv --save
```

そして

```
Use dotenv to read .env vars into Node
require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;

// Reference .env vars off of the process.env object
MongoClient.connect(process.env.DB_CONN, function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});
```
このように使います。

```.env```はgithubに上げないように。
秘密にしましょう


## process.envとは、何か、なぜ、いつ、どのように、効果的に使うのか

- process.envとは何でしょうか

process.envグローバル変数は、

実行時にアプリケーションによって使用されるようにNodeによって注入され、

起動時にアプリケーションが存在するシステム環境の状態を表します。

- なぜ環境変数は重要なのでしょうか

アプリケーションを有効にするためにはアプリケーションをデプロイする必要があります
デプロイは単純なwebサイトを作るようなコードから集中的なコンピュータ処理を行うような複雑なAPIまで全て可能です
最終的にもしアプリケーションがデプロイされなかったら、誰もそれを使うことができないし、目的は達せられません

もしデータベースが必要なら開発時は```127.0.0.1:3306```という文字列を使ってコネクションするかもしれないが、
本番デプロイ時には```54.32.1.0:3306```へリンクさせたいかもしれない

環境変数を使わないとすると、
どちらも同じマシーン上でデータベースが利用可能か確認する必要がある
結果、タイトな結び付きになり、低い利便性、低い拡張性(一つのデータベース上に依存している一つのアプリケーションのインスタンスだけをデプロイすることになる)になる
もしくは複数の状態の連続の中で自分たちのコードを編集しなければならなくなる

```
let connectionString;
if (runningLocally()) {
  connectionString = 'dev_user:dev_password@127.0.0.1:3306/schema';
} else if (...) {
  ...
} else if (inProduction()) {
  connectionString = 'prd_user:prd_password@54.32.1.0:3306/schema';
}
const connection = new Connection(connectionString);
```

これはコードをテストするのにうんざりさせられる
また見苦しい
環境変数を使ってみよう

```
const connection = new Connection(process.env.DB_CONNECTION_STRING);
```

外部サービスの依存関係を記述することはアプリケーションとは独立して、

拡張可能なリモートのロードバランサーに繋げることができ、

独立的なアプリケーションのデータベースサービスを複数持つことができます

一般的に
サービスの依存関係を常に付属のリソースのリソースとして扱うことをオススメします
環境変数を使ってそれらを定義します


- どのように使うのか

環境変数を提供する行為は、プロビジョニングと呼ばれます
私たちはサーバープロビジョニングを扱うときに動く2つの階層を持ちます
インフラとアプリケーションです。
どちらもアプリケーション階層のロジックを通して環境変数をセットできます

共通のアプリケーション階層のツールは```.env```と名付けられたファイルから環境変数をロードすることができる```dotenv```です。

```
npm install dotenv --save
```

環境変数をローディングするのは一行です。

```
npm install dotenv --save
```

これは開発のニーズに対して便利ですが、
環境をアプリケーションに結びつけるのは悪い習慣と考えられますので、
```.gitignore```ファイルに```.env```を追加してください

インフラ階層では、
PM2、Docker Compose、Kubernetesなどのデプロイメントマネージャツールを使用して環境を指定できます。

PM2は```env```プロパティを使って環境を指定できる```ecosystem.yaml```ファイルを使います

```
apps:
  - script: ./app.js
    name: 'my_application'
    env:
      NODE_ENV: development
    env_production:
      NODE_ENV: production
```

Docker Compose はサービスマニフェストの中に記述された```environment```プロパティに対して同様にできます

```
version: "3"
services:
  my_application:
    image: node:8.9.4-alpine
    environment:
      NODE_ENV: production
      ...
```
Kubernets は環境を設定できるpod テンプレートのなかで同等の```env```プロパティを持ちます

```
kind: Deployment
apiVersion: extensions/v1beta1
metadata:
  name: my_application
spec:
  ...
  template:
    spec:
      env:
        - name: NODE_ENV
          value: production
        ...
```

- いつ使うか

**アプリケーション構成で**

アプリケーション構成はアプリケーションの論理的な振る舞いに影響を与えません

例えば、あなたのアプリケーションはアクセス可能になるポートをリッスンする必要があることを知っていますが、

正確なそのようなポートをしる必要はありません

そのような状態では

これらの値を環境変数として分類することで、

デプロイオーケストレータに任務を任せて

ポートのデコンフリクトを解消し、

アプリケーションがアクセス可能になるために必要なネットワークマップを編成することができます。

**サービス構成のリンクで**

WIP

**デプロイツールとして**

WIP

**アンチパターン**

1. NODE_ENVの過剰使用 - 多くのチュートリアルではprocess.env.NODE_ENVを使用するように教えられていますが、それほど多くはないので、NODE_ENVの値に基づいてif-else分岐を行う傾向があります。 これは環境変数を使用する目的を打ち消します。

2. 時間の影響を受けやすい情報 - 同じサーバー内にデプロイされた別のアプリケーションと通信するためにSSL証明書/ローテーションパスワードが必要なアプリケーションの場合は、環境変数として指定するのが賢明ではありません。 注入された環境は、実行時の環境の状態を表し、静的なままです。

3. タイムゾーンの設定 - Leon Bambrickは2010年に次のように述べています。「コンピュータの科学には2つの困難な問題があります。キャッシュの無効化、名前の付け方、1つのみのエラー」です。別のタイムゾーンを追加します。 高可用性で展開する場合、アプリケーションは複数の可用性ゾーンでインスタンス化できます。 1つのインスタンスは、サンフランシスコのファンシーなデータセンターとシンガポールの別の場所で、ユーザーはロンドンから来ています。 UTCで変換し、タイムゾーンの解像度をクライアント側に任せます。

## ブラウザの中での環境変数の取り方

WIP
[How To Get Environment Variables in the Browser](https://www.simonewebdesign.it/how-to-get-environment-variables-in-the-browser/)

## 環境変数の表示


```
$ set
```
or

```
$ printenv
```

or

```
$ env
```

<img src="https://kenjimorita.jp/wp-content/uploads/2018/08/12.png">


```
PATH – Display lists directories the shell searches, for the commands.
HOME – User’s home directory to store files.
TERM – Set terminal emulator being used by UNIX.
PS1 – Display shell prompt in the Bourne shell and variants.
MAIL – Path to user’s mailbox.
TEMP – Path to where processes can store temporary files.
JAVA_HOME – Sun (now Oracle) JDK path.
ORACLE_HOME – Oracle database installation path.
TZ – Timezone settings
PWD – Path to the current directory.
HISTFILE – The name of the file in which command history is saved
HISTFILESIZE -The maximum number of lines contained in the history file
HOSTNAME -The system’s host name
LD_LIBRARY_PATH -It is a colon-separated set of directories where libraries should be searched for.
USER -Current logged in user’s name.
DISPLAY -Network name of the X11 display to connect to, if available.
SHELL -The current shell.
TERMCAP – Database entry of the terminal escape codes to perform various terminal functions.
OSTYPE – Type of operating system.
MACHTYPE – The CPU architecture that the system is running on.
EDITOR – The user’s preferred text editor.
PAGER – The user’s preferred text pager.
MANPATH – Colon separated list of directories to search for manual pages.
```

以下はshell毎の現在のsessionに対して設定されているenviroment variableを変更している

```
JAVA_PATH=/opt/jdk/bin
export JAVA_PATH`
```

## 実験

環境変数がすぐにで使われる様子をテスト

```
cd /env
```

以下の順で叩く

```
node test.js
undefined
```
and then

```
hello=world node test.js
Env( hello ): undefined
```
and then

```
hello=world debug=log node test.js
Env( hello ): world
```

and then

```
hello=world debug=trace node test.js
Env( hello ): world
Trace: This is me debugging!
    at Object.<anonymous> (/Git/javascript/env/test.js:13:1)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:393:7)
    at startup (bootstrap_node.js:150:9)
    at bootstrap_node.js:508:3
```
が出力される


## What is the difference between ```process.env.USER` and `process.env.USERNAME``` in Node?
Nodeにおいてのprocess.env.USERNAMEとprocess.env.USERの違い

This object can really contain just about anything, as specified the OS and the process that launches it, but by default Windows stores the username in USERNAME and Unix-like systems (Linux, macOS, etc.) store it in USER

```process.env```はOSのprocessが提供するprocessのenvironment variablesです
これはOSに記述されそれが起動する際のprocessのすべてを含まれます。

ユーザーネームははdefaultではWindowsはUSERNAMEの中に保存し、
Unixのような(Linux,macOS等)はUSERの中に保存します


 process.env is not meant to be normative.  process.env can be basically anything -- its values generally have OS defaults provided by the shell, but ultimately they are controlled by the user and/or the process that launched your process.


process.envは規範的なものではなく、基本的には何でもかまいません。

その値には一般的にシェルが提供するOSのデフォルトがありますが、

最終的にはプロセスを起動したユーザーやプロセスによって制御されます。


## /etc/profileと$HOME/.profileとshell起動時の挙動

EnvironmentVariableは
いくつかはシステムによって設定、
他はあなたによって
またはshell、他のプログラムをロードする際のプログラムによって設定される。

値は文字列です。

shellがアウトするまで値は保持される

systemへログインする際に、

shellは下層でinitialzationを呼び環境を設定するために解析する

それは2つの過程を踏みます
```
/etc/profile
.profile
```

shellは/etc/profileファイルが存在するかどうかみる

もし存在していれば

shellはそれを読み、
そうでない場合はスキップする

エラーメッセージは出ない

shellは.profileがhomeディレクトリに存在するかどうかみる

homeディレクトリはログインの後に始まるディレクトリです

もし存在すれば
shellはそれを読み、

そうでなければshellはそれをスキップする

エラーは出ない

そして両方読んだらすぐ、

shellは
```
$
```
プロンプトを表示する

これはコマンドを実行するために入力できるプロンプトです

```/etc/profile```はUnixのシステム管理者によって維持され
システム上のすべてのユーザーによって求められているshellの初期設定情報
を含む

.profileはあなたのコントロール下にある
あなたは多くのshellへのカスタマイズ情報を追加できる

あなたが設置を含む必要がある最小限の情報設定を追加できる
あなたが使うtermnaiのタイプ
コマンドを配置するためのディレクトリリスト
ターミナルの参照に影響する値のリスト
など

```.profile```をhomeディレクトリで```.profile```をチェックで.きます

あなたの環境に対して設定されているすべての値をエディタでチェックできます
あなたが使っているターミナルの型は自動的にgetterやloginかどちらかによって設定されます
たまに自動設定過程であなたのターミナルは間違って予想Dします

もしあなたのターミナルが間違って設定されたら
コマンドのアウトプットは不思議に見えるかもしれないし
shellはインタラクトできないかもしれない

これを確認するケースを確認するために
多くのユーザーは
下のようにデモンストレートする

```
$TERM=vt100
```

コマンドプロンプト上のどんなコマンドもタイプする時は
シェルはそれを実行可能な前にコマンドへの参照を持つ

PATHの値はコマンドラインに対して見るべきか場所を記述する

通常Pathの値は下のように設定する

```
$PATH=/bin:/usr/bin
```

それそれの分岐はコロン文字によって分けられている

もしあなたがシェルにコマンドを実行するためにリクエストし、

それがパスの値としてどの与えられたディレクトリにもみつからない場合

同じようなメッセージが出現する

```
$hello
hello: not found
$
```

# WIP


## npm script

```
npm i -D webpack-cli
```
だけだとコマンドラインで叩けないので

```
npm i -g webpack-cli
```

する必要があるが、
OSに直接インストールしているので環境が壊れる

```
npm i -D webpack-cli
```
でローカルプロジェクトにインストールされたライブラリのCLIを叩くことができるのが```npm script```

```
watch: webpack --watch
```


```
fafa: webpack -c
```
というのがあって

```
npm run fafa --fafa.js
```

で実行すると

```
webpack -c fafa.js
```

と同じことになる


## 便利モジュール

- opener
- better-npm-run
- pm2
- cross-env

## [opener](https://github.com/domenic/opener#readme)

コマンドラインからブラウザを開ける


install
```
yarn add -D opener
```
npm script記述
```
"la": "opener http://admin.local.kenjimorita.jp/login/?next=/",
```

yarn laで開けるコマンド

## better-npm-run

### [pm2](https://github.com/Unitech/pm2)

### [cross-env](https://github.com/kentcdodds/cross-env#readme)

scriptの中で cross-env GREETに対して"Joe"を代入してから、childScriptを実行
childScriptでは$GREETを呼び出す実行をしている

```
"parentScript": "cross-env GREET=\"Joe\" npm run childScript",
"childScript": "cross-env-shell \"echo Hello $GREET\"",
```

## 設定の意味

appを起動する前に

```
export NODE_ENV=production(win: SET NODE_ENV=production)
```

コマンドラインでこれだけ打つと
セッションが切れたら、サーバーをリスタートしたらなくなってしまう

このように起動時に設定することもできる

```
NODE_ENV=production node app.js
```

もしくは

jsファイルに設定することもできる

```
process.env.NODE_ENV = 'production';
```

実行時にこれをやる事はオススメしない
サーバー内でvimを立ち上げてそれを変更する事は簡単ではない。

なので、
ディレクトリのルートにconfig.jsonを用意し、
appが実行するときはいつもそこから読み、初期値を設定できるようにする



もしくは

サーバーを立ち上げる時にはいつでも

.bash_profileに記述した後更新して

```
$ echo $ echo export NODE_ENV=production >> ~/.bash_profile
$ source ~/.bash_profile
```

保管する方法もある


.envファイルもそれらを解決できる

アプリのルート直下にそれを置いて
```
require('dotenv').config()
```
で値を読む
簡単に読めるし簡単に変更できるし何よりクロスプラットフォーム(Windows, Mac or Linux )を選ばない



## その他

[Differnce between sh and bash](https://stackoverflow.com/questions/5725296/difference-between-sh-and-bash?rq=1)
・shは[POSIX標準](http://pubs.opengroup.org/onlinepubs/009695399/utilities/xcu_chap02.html)によって書かれているShellコマンドのプログラミング言語。
bashもshを考慮されている。
shは仕様で実装ではない。/bin/shはPOSX上の実装への実体へのシンボルリンク。
bashはPOSIXより数年前にsh互換の実装として先行して始められた

```.bash_profile```は？

.profileはBourne互換のシェル([ボーンシェル](https://ja.wikipedia.org/wiki/Bourne_Shell))で使用されていますが、

.bash_profileはbashのみで使用されています。

[sh compatibleってどういう意味？](https://unix.stackexchange.com/questions/145522/what-does-it-mean-to-be-sh-compatible)





## 参照

[https://en.wikipedia.org/wiki/Environment_variable](https://en.wikipedia.org/wiki/Environment_variable)

[Serverlessでnode-configを使う](https://qiita.com/70_10/items/31ecaf802ec885c35ca3)

[Here’s how you can actually use Node environment variables](https://medium.freecodecamp.org/heres-how-you-can-actually-use-node-environment-variables-8fdf98f53a0a)

[Environment Variables in Node.js](https://medium.com/@maxbeatty/environment-variables-in-node-js-28e951631801)

[Difference between set, export and env in bash](http://hackjutsu.com/2016/08/04/Difference%20between%20set,%20export%20and%20env%20in%20bash/)

[Understanding Environment Variables and the Unix Path](https://cbednarski.com/articles/understanding-environment-variables-and-the-unix-path/)

[Running Express.js in Production Mode](http://www.hacksparrow.com/running-express-js-in-production-mode.html)

[Working with Environment Variables in Node.js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)

[https://www.cyberciti.biz/faq/set-environment-variable-unix/](https://www.cyberciti.biz/faq/set-environment-variable-unix/)

[https://www.bennadel.com/blog/2688-providing-environment-variables-when-executing-node-js-program.htm](https://www.bennadel.com/blog/2688-providing-environment-variables-when-executing-node-js-program.htm)

[https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7](https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7)

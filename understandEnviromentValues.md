# 環境変数(UnixやNode)とnpm scriptとかpackage.json周りの話



nodeでいう環境変数
グローバル変数とすることもできるが、
nodeの環境変数は実行する特定のプロセスで頻繁に利用する変数です

Webapplicationを持っていたら
PORT
DBCONECTION
JAVA_HOME
の脈絡の中ではenvironment variablesは設定のようなものだが、

nodeの環境変数はハードコードしたくない情報を渡すための手段です

nodeアプリの中で定義できて読み込む様々な方法を示しましょう

```
PORT=65534 node bin/www
```
nodeを実行する時このように指定でき

```
const port = process.env.PORT
```

取得できるが、

複数の作る必要がある際に実行が見づらくなる。


```
PORT=65534 DB_CONN="mongodb://react-cosmos-db:swQOhAsVjfHx3Q9VXh29T9U8xQNVGQ78lEQaL6yMNq3rOSA1WhUXHTOcmDf38Q8rg14NHtQLcUuMA==@react-cosmos-db.documents.azure.com:19373/?ssl=true&replicaSet=globaldb" SECRET_KEY=b6264fca-8adf-457f-a94f-5a4b0d1ca2b9  node bin/www
```


なので```.env``` ファイルを使う

```
PORT=65534
DB_CONN="mongodb://react-cosmos-db:swQOhAsVjfHx3Q9VXh29T9U8xQNVGQ78lEQaL6yMNq3rOSA1WhUXHTOcmDf38Q8rg14NHtQLcUuMA==@react-cosmos-db.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
SECRET_KEY="b6264fca-8adf-457f-a94f-5a4b0d1ca2b9"
```

このように設定したものをルートに置き

読み込むちょっとしたオプションもあるが
一番簡単にenvファイルを読み込む方法は

```dotenv```
を使う方法。

どこからでもそれを使えるようにpackage.jsonに必須にする

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
このように使う
envはgithubに上げないように。
秘密にする



## Display Environment Variable

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


## /etc/profileと$HOME/.profileとshell起動時の挙動

EnvironmentVariableは
いくつかはシステムによって設定、
他はあなたによって
またはshell、他のプログラムをロードする際のプログラムによって設定される。

値は文字列です。

$HOGEでアサインする

shellがアウトするまで値は保持される

systemへログインする際に、

shellは下層でinitialzationを呼び環境を設定するために解析する

それは2つの過程を踏みます
```
/etc/profile
.profile
````

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

それそれの分岐はコロン文字によって分けられたている

もしあなたがシェルにコマンドを実行するためにリクエストし、

それがパスの値としてどの与えられたディレクトリにもみつからない場合

同じようなメッセージが出現する

```
$hello
hello: not found
$
```










---
# WIP

改めてまとめてみる

index

- npm script
- 環境変数
- package.json

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

---

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

---

## 環境変数


---

## 便利モジュール

- opener
- better-npm-run
- pm2
- cross-env

### [opener](https://github.com/domenic/opener#readme)

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

### better-npm-run

### [pm2](https://github.com/Unitech/pm2)

### [cross-env](https://github.com/kentcdodds/cross-env#readme)

scriptの中で cross-env GREETに対して"Joe"を代入してから、childScriptを実行
childScriptでは$GREETを呼び出す実行をしている

```
"parentScript": "cross-env GREET=\"Joe\" npm run childScript",
"childScript": "cross-env-shell \"echo Hello $GREET\"",
```

### 設定の意味

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






*ref*

[Serverlessでnode-configを使う](https://qiita.com/70_10/items/31ecaf802ec885c35ca3)

[Here’s how you can actually use Node environment variables](https://medium.freecodecamp.org/heres-how-you-can-actually-use-node-environment-variables-8fdf98f53a0a)

[Environment Variables in Node.js](https://medium.com/@maxbeatty/environment-variables-in-node-js-28e951631801)

[Difference between set, export and env in bash](http://hackjutsu.com/2016/08/04/Difference%20between%20set,%20export%20and%20env%20in%20bash/)

[Understanding Environment Variables and the Unix Path](https://cbednarski.com/articles/understanding-environment-variables-and-the-unix-path/)

[Running Express.js in Production Mode](http://www.hacksparrow.com/running-express-js-in-production-mode.html)

[Working with Environment Variables in Node.js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)

[https://www.cyberciti.biz/faq/set-environment-variable-unix/](https://www.cyberciti.biz/faq/set-environment-variable-unix/)


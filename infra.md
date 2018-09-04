# フロントエンジニアが最低限知るべきインフラ周りのこと

index

・登場するワード
・参照

## 登場するワード

### オンプレミス
自社でデータセンターを保有してシステム構築から運用までを行う形態のこと

### パブリッククラウド
インターネットを介して不特定多数に提供されるクラウドサービスのこと

### PaaS lassS SaaS DaaS

- Paas(Platform as a Service)
サービスとしてのプラットフォーム
ネットワークなののインフラ
OSなどのプラットフォーム
をインターネット上で利用できるもの
・Google App Engine(Google Cloud Platform)
・Microsoft Azure(マイクロソフト・アジュール)
・Heroku（ヘロク）
・IBM Bluemix
など

必要な環境がすでに揃っているのでプログラムを作ることに集中できるが、環境をカスタマイズするのは難しい


- IaaS(イァース、アイアース)
仮想サーバ、ハードディスク、ファイアーウォールなどのインフラを提供する
PaaSと違って最低限の環境しか提供しない
・Google Compute Engine
・Amazon Elastic Compute Cloud
・Xサーバーなどのレンタルサーバー
など
VPSとの違いは
IaaSは料金は使った分、リソース量を変えられる
VPSは料金は一定、リソースを変えるためには契約を変えなければならない

アプリ・プラットフォームをかなり自由に開発できるが専門的な知識が必要

- SaaS(Software as a Service)
・Gmail、Yahoo!メール
・Google Photo
・無料ブログサービス

全てのサービスがウェブ上で使えるので自由度は低いが開発スキルや手間はなく使えるが、すでに用意してあるサービスなので自由度は低い


- DaaS(Desk as a Service)
パソコンのデスクトップ環境をクラウドで作って、インターネットを通じて利用するサービス
・Microsoft Virtual Desktop
・IBM Smart Business Desktop
・Citrix XenDesktop

全てのサービスがウェブ上で使えるので自由度は低いが開発スキルや手間はなく使えるが、すでに用意してあるサービスなので自由度は低い


## Kubernetes(k8s。クーバーネティス)
[30分ぐらいでわかる「Kubernetes」について](https://www.slideshare.net/YuyaOhara/30kubernetes-81054893)

## DevOps(デブオプス)
開発（Development）と運用(Operations)が協力し、ビジネスの要求に対して、より柔軟に、スピーディに
対応できるシステムを作り上げるためのプラクティス
開発のミッションは「より良いものを作る事」。変更、修正、追加を継続的に行う事
運用者のミッションは「安定定期にシステムを稼働する事」患者には触らないと言う思想。安定的に動いているならば
変更、修正、追加を加えなければ問題ないと言う考え
このDevとOpsの衝突を解消するには、測定、共有、自動化、コラボレーション、そしてカルチャーが必要。
これらを解決するための環境づくりを作るための方法がDevOps


## docker client vs docker engine vs docker daemon
docker enginとdocker daemonはどちらも置き換えられる
それらは同じ実態を参照している

- Docker Clientは全てのdockerコマンドを実行するときに使うユーティリティだ
例えば ```docker run(docker container run)、docker image, docker ps```

など
これらは人間が理解しやすいようなこれらのコマンドが実行可能

- Docker Daemon/Engine
これは、魔法の残りを行い、
カーネルとの会話の仕方を知っている部分であり、
Dockerのユーザが気にする必要のないコンテナを作成、操作、管理するシステムコールを作ります。

Docker clientとDocker enginとの間の通信はREST apiの通信によって起き、
Docker engine はデフォルト2376ポートで動作します


## docker host vs docer container
・docker hostはdocker Engineをインストールしたマシン
・dockerコマンドを通してコンテナの中で始めたプロセスがcontainer



##

あなたは芸人です

芸人のネタ帳を

芸人が活動する場所は

吉本興業の舞台Aがあります

舞台Aでネタをするために、
舞台Bという練習できる場所もあります
さらに舞台Cという練習の練習ができる、場所もあります

これらは一人のオーナーが管理しています。
が
オーナーは他にも仕事をしているので
3つの舞台を管理するのは大変です。

なので
オーナーをそれぞれ舞台管理者A、舞台管理者B、舞台管理者C
に任せることにしました

このようにすれば
オーナー自体は複数の舞台をみる必要がありません

仮想環境とDockerEngineの違いは

仮想環境は一つのオーナー(1人のユーザー、1プロセス)
Docker Engineはそれぞれの舞台に管理者をつける(複数のユーザー、複数のプロセス)

違いがあります。

さて芸人のあなたはDockerのような環境が整いました

コンテナと呼ばれる舞台Aでネタをするには
ライブの段取りを知らないといけません

- 最初に構成作家の挨拶、
- 今日のライブの説明
- 出番の確認
- ネタの終わり方と小道具の確認
- MCの登場
- 本番
(ライブは本来終わりがありますが、ここではWebですのでネタがズーーーと続くものとします)

またライブに来たお客さんを楽しませるために色々インフラな部分を用意するものがあります

- 照明器具
- 音響器具
- マイク
- 舞台
- 椅子
- アンケート用紙
- 黒子さん
- モニター

これらはごくごく当たり前にあるものです
ただ
それぞれの要素は色々な種類のものがあります
例えば
照明なら
暖かい光を注ぐタイプか、カラーフィルターを適応できるものなのか、ピンライトなのか
椅子なら、座布団付きなのか、パイプ椅子のみなのか、横一列の台のようなタイプか
これらは
舞台を作るときに決めなければなりません
































## 参照
[今さら聞けないPaaSとは？IaaS、SaaS、DaaSとの違いを説明します](https://ec-orange.jp/ec-media/?p=18343)
[いまさら聞けない「DevOps」](http://www.atmarkit.co.jp/ait/articles/1307/02/news002.html)
[Docker入門（第一回）～Dockerとは何か、何が良いのか～](https://knowledge.sakura.ad.jp/13265/)
[Docker コンテナ・ネットワークの理解](http://docs.docker.jp/engine/userguide/networking/dockernetworks.html)
[30分ぐらいでわかる「Kubernetes」について](https://www.slideshare.net/YuyaOhara/30kubernetes-81054893)
[3分で分かった気になる、Kubernetes とは？](https://qiita.com/r548/items/e6d1e4dcfdd9f8a7874d)



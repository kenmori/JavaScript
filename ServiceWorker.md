# 誰でも理解できるようにServiceWorkerを説明してみる

WIP

## 登場人物
### ServiceWorker(以下SW)・・・自分(派遣社員)
### scriptImports・・・その人の技術
### デパート・・・ブラウザ
### 店長・・・ブラウザキャッシュ
### 品物・・・静的リソース
### 売り場・・・ページ
### 派遣会社・・・サーバー
### お客さん・・・ユーザー

WIP

## Resister

この派遣社員を送りますよという登録

```js
resister('sw.js')
```

scope(働く場所の設定)


この階の下全部

```js
resister('sw.js', {scope: '/'})
```
や
```js
resister('sw.js', {scope: '/lp/'})
```

lpの下全部など

この場合

```/lp/home.html```や```/lp/image/```

は参照できるが

```/media/home.html```や```/```
など
兄弟で違う階層や、「働く場所」より上の階層は参照できない


### install

出勤してバックヤードで品物を分ける(キャッシュするかどうかの判断をする)


```js
self.addEventListener('install', function(event) {
  event.waitUntil(//作業が終わるまで待つ
    caches.open(cacheName).then(function(cache) {//名前が書いてあるcacheNameという箱に入れる用意
      return cache.addAll(
        [//これらを入れておく
          '/css/bootstrap.css',
          '/css/main.css',
          '/js/bootstrap.min.js',
          '/js/jquery.min.js',
          '/offline.html'
        ]
      );
    })
  );
});

```



WIP

### waiting

自分はお客さんが来店するのをバックヤードで待つ
もし既に店内に別の従業員がいたらその人が接客を終えるまでジッと待つ
この時skipWaitinを実行すると売り場へいく


WIP

### activated
売り場。
ここでclaimを実行すると自分がそのまま先頭に立って接客する
もし実行しなければ売り場にはいるが、交換するまで待っている状態


ユーザーがscope内に移動するとnavigateに登録されているsw.jsをブラウザは派遣会社にリクエストしに行く
・デパートは店長に確認する。
・あの派遣社員の契約は前と変わっているか？
・あの派遣社員は24時間働いているか、以内に収まっているか
・8時間しか経っていない。
・最後のsw.jsの更新から24時間経っていたら「必ず」サーバーにリクエストする
・


WIP




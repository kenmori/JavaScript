# 誰でも理解できるServiceWorker


### 登録

```js
navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered!', reg))
    .catch(err => console.log('Boo!', err));
```

### インストール

ServiceWorker(以下SW)のインストールは一度だけ

SWの記述が前回と違う場合ブラウザは別のSWとして再度インストールが実行される


event.waitUntil・・・Promiseを渡す。インストールが完了したか、成功したかを把握するために使う



## 参照

[ServiceWorker ドキュメント](https://jakearchibald.github.io/isserviceworkerready/resources.html)
[from ServiceWorkerをさせたくない場合](https://stackoverflow.com/questions/33590378/status-code200-ok-from-serviceworker-in-chrome-network-devtools)
[ServiceWorkerのRegistration](https://nhiroki.jp/2015/07/05/service-worker-registration)

[ServiceWorkerのスコープとページコントロールについて](https://qiita.com/nhiroki/items/eb16b802101153352bba)

[ServiceWorkerの紹介](https://developers.google.com/web/fundamentals/primers/service-workers/#lifecycle)

[ServiceWorkerを使用する](https://developer.mozilla.org/ja/docs/Web/API/ServiceWorker_API/Using_Service_Workers)

```js
//sw.js

var CACHE_NAME = 'cache-v1';
var urlsToCache = [
  './assets/img/box01_bg.jpg'
];
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('cache-v1').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if(response){//キャッシュがあったのでレスポンンスを返す
          return response;
        }
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        // 応答が返される前にここで編集する
        return fetchPromise;
      })
    })
  );
});
```




# README


## develop environment

1.イメージのビルド

```
docker-compose build web
```
2.mysqlのセットアップ
```
docker-compose run --rm web bin/rails db:create
docker-compose run --rm web bin/rails db:migrate
```

3.初期データ投入
```
docker-compose run --rm web bin/rails db:seed
```

4.コンテナーの立ち上げ
```
docker-compose up -d
```


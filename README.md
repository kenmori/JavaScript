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
3.コンテナーの立ち上げ
```
docker-compose up -d
```

[![CircleCI](https://circleci.com/gh/suikalemoned/resily.svg?style=shield&circle-token=2c0dc0552d295856e1e80cc81633b7f7c5e27695)](https://circleci.com/gh/suikalemoned/resily)

# Resily (リシリー)

OKR の作成・運用・管理を目的としたクラウド OKR ツール。

詳細は [スタートガイド](https://github.com/suikalemoned/resily/wiki/%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%88%E3%82%AC%E3%82%A4%E3%83%89) を参照。

## ローカル開発環境の構築

開発環境は macOS を想定。Windows, Linux で環境構築できるかは未確認。

### インストール

- Ruby 2.4
- MySQL 5.7.x
- Docker (Docker Compose)

### ビルド

```
cd /path/to/resily
docker-compose build web
docker-compose run --rm web rails db:setup
docker-compose up -d
```

### コンテナー

- Web: [http://localhost:3000/](http://localhost:3000/)
  - (未ログイン状態だと) ログイン画面にリダイレクトされる
  - メールアドレス/パスワードは `./db/seeds.rb` 参照
- DB:
  - MySQL
  - ユーザー名は `./config/database.yml` 参照
  - パスワードは `./docker-compose.yml` 参照
- MailHog: [http://localhost:8025/](http://localhost:8025/)
  - AWS SES 代替の SMTP サーバー
- Minio: [http://localhost:9000/minio/resily/](http://localhost:9000/minio/resily/)
  - AWS S3 互換のオブジェクトストレージ
  - Access Key / Secret Key は `./docker-compose.yml` 参照
    - 基本的にはログイン不要

### テストの実行

```
docker-compose run web bundle exec rake
```

`rspec` コマンドを用いてテストを実行する場合には `RAILS_ENV` を明示的に指定する必要があります。

```
docker-compose run -e RAILS_ENV=test web bundle exec rspec
```

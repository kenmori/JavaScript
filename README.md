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
cd resily
docker-compose build web
docker-compose run --rm web bin/rails db:setup
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

[![CircleCI](https://circleci.com/gh/Resily/resily.svg?style=shield&circle-token=2c0dc0552d295856e1e80cc81633b7f7c5e27695)](https://circleci.com/gh/Resily/resily)
[![API Doc](https://img.shields.io/badge/API%20Doc-here-green.svg)](https://circleci.com/api/v1.1/project/github/Resily/resily/latest/artifacts/0/home/circleci/repo/docs/api/index.html?&branch=master&filter=successful)

# Resily (リシリー)

OKR の作成・運用・管理を目的としたクラウド OKR ツール。

詳細は [スタートガイド](https://github.com/Resily/resily/wiki/%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%88%E3%82%AC%E3%82%A4%E3%83%89) を参照。

## ローカル開発環境の構築

開発環境は macOS を想定。Windows, Linux で環境構築できるかは未確認。

### インストール

- Docker (Docker Compose)

### ビルド

```
cd /path/to/resily
docker-compose build
docker-compose run --rm api rails db:setup data:migrate
```

### Frontend を含めてサービスを起動

```
docker-compose up frontend
```

localhost:3000 でサービスにアクセス可能

### API サーバーのみ起動

```
docker-compose up api
```

localhost:8080 でAPIにアクセス可能

### コンテナー

- Web: [http://localhost:3000/](http://localhost:3000/)
  - (未ログイン状態だと) ログイン画面にリダイレクトされる
  - メールアドレス/パスワードは `./core-api/db/seeds.rb` 参照
- DB:
  - MySQL
  - ユーザー名は `./core-api/config/database.yml` 参照
  - パスワードは `./docker-compose.yml` 参照
- MailHog: [http://localhost:8025/](http://localhost:8025/)
  - AWS SES 代替の SMTP サーバー
- Minio: [http://localhost:9000/minio/resily/](http://localhost:9000/minio/resily/)
  - AWS S3 互換のオブジェクトストレージ
  - Access Key / Secret Key は `./docker-compose.yml` 参照
    - 基本的にはログイン不要

### テストの実行

```
docker-compose run --rm api bundle exec rake
```

`rspec` コマンドを用いてテストを実行する場合には `RAILS_ENV` を明示的に指定する必要があります。

```
docker-compose run --rm -e RAILS_ENV=test api bundle exec rspec
```

### data migrate

[Data Migrate](https://github.com/ilyakatz/data-migrate) という gem を使ってデータ投入を行うことができるようにしています。

`db/data` 以下にデータ投入用のマイグレーションファイルを置き、次のコマンドを実行するとデータ投入できます。

```
$ rake data:migrate
```

`db/data` 以下のファイルは generator で作成できます。

```
rails g data_migration add_this_to_that
```

詳しくは gem の README を見てください。

# helm 管理用ディレクトリ

## このドキュメントの目的

- helmのレンダリング方法が分かること
- helmとkubectlを使ってk8sクラスタへリソースをデプロイ出来るようになること

## Prerequisite

- helm がインストールされていること(後でwrapper作るかも)

## How to render files
### core-api

```bash
# ステージング環境
$ helm template core-api --name staging

# 本番環境
$ helm template core-api --name production
```

## How to apply to k8s cluster
### core-api

```bash
# ステージング環境
$ helm template core-api --name staging | kubectl apply -f - -n resily

# 本番環境
$ helm template core-api --name production | kubectl apply -f - -n resily
```

## Others
基本的にはレンダリング結果をファイルに出力し、それをkubectlでapplyします

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


* develop environment
init migare 
```
docker-compose run --rm web bin/rails db:create
docker-compose run --rm web bin/rails db:migrate
```

raise rails-server with docker
```
docker-compose up -d
```

raise webpack-dev-server
```
./bin/webpack-dev-server --host 127.0.0.1
```
FROM ruby:2.6-alpine

ARG RAILS_ENV="production"
ARG BUILD_WITHOUT="development test"
ENV LANG C.UTF-8

WORKDIR /app
RUN apk --update add --no-cache \
  build-base \
  git \
  tzdata \
  curl-dev \
  libxml2-dev \
  mysql-dev \
  mysql-client \
  imagemagick6 \
  imagemagick6-dev \
  graphviz

COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install --without $BUILD_WITHOUT
COPY . .

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]

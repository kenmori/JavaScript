FROM ruby:2.4.1
ENV LANG C.UTF-8

ARG RAILS_ENV

# Prepare for yarn installing
RUN apt-get update && apt-get install apt-transport-https
RUN apt-get update && apt-get install -y --force-yes build-essential libpq-dev mysql-client graphviz
RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN gem install bundler
RUN bundle install
COPY . /app

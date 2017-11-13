FROM ruby:2.4.1

# Prepare for yarn installing
RUN apt-get update && apt-get install apt-transport-https
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y --force-yes build-essential libpq-dev nodejs yarn mysql-client
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp
RUN yarn install

ARG RAILS_ENV
ARG NODE_ENV

RUN if [ $RAILS_ENV != "development" ]; then RAILS_ENV=$RAILS_ENV NODE_ENV=$NODE_ENV bundle exec rails assets:precompile --trace; fi
CMD bundle exec rails s puma -b 0.0.0.0 -p 3000 -e $RAILS_ENV

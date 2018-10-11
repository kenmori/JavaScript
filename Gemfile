# frozen_string_literal: true

source "https://rails-assets.org"
source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 5.2.1"
# Use mysql as the database for Active Record
gem "mysql2", "~> 0.5.2"
# Use Puma as the app server
gem "puma", "~> 3.12.0"
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem "webpacker", "= 3.5.5"

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem "turbolinks", "~> 5"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder", "~> 2.6.4"
gem "oj", "~> 3.6.10"

gem "devise", "~> 4.5.0"

gem "gon", "~> 6.2.1"

gem "active_decorator", "~> 1.0.0"
gem "carrierwave"
gem "carrierwave-i18n"
gem "fog"
gem "foreman", "~> 0.82.0"
gem "gaffe"
gem "health-monitor-rails", "~> 7.2"
gem "redis-namespace", "~> 1.6"
gem "rmagick"
gem "sidekiq", "~> 5.1"
gem "slim-rails", "~> 3.1", ">= 3.1.3"

group :development do
  gem "better_errors"
  gem "binding_of_caller"
  gem "bullet"
  gem "html2slim"
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "meta_request"
  gem "rails-erd", "1.5.0"
  gem "rubocop-rspec"
  gem "rubocop", require: false
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "spring"
  gem "web-console", ">= 3.3.0"
end

group :development, :test do
  gem "awesome_print", require: "ap"
  gem "guard"
  gem "guard-rspec"
  gem "guard-rubocop"
  gem "pry-byebug"
  gem "pry-rails"
  gem "rspec-rails"
  gem "spring-commands-rspec"
end

group :test do
  gem "database_rewinder"
  gem "fuubar"
  gem "vcr"
  gem "webmock"
end

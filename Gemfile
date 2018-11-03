# frozen_string_literal: true

source "https://rails-assets.org"
source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem "active_decorator", "~> 1.0.0"
gem "ancestry"
gem "carrierwave"
gem "carrierwave-i18n"
gem "data_migrate"
gem "devise", "~> 4.5.0"
gem "dry-configurable"
gem "fog"
gem "foreman", "~> 0.82.0"
gem "gaffe"
gem "gon", "~> 6.2.1"
gem "health-monitor-rails", "~> 7.2"
gem "jbuilder", "~> 2.6.4"
gem "kakurenbo-puti"
gem "mysql2", "~> 0.5.2"
gem "oj", "~> 3.6.10"
gem "puma", "~> 3.12.0"
gem "rails", "~> 5.2.1"
gem "redis-namespace", "~> 1.6"
gem "rmagick"
gem "sidekiq", "~> 5.1"
gem "slim-rails", "~> 3.1", ">= 3.1.3"
gem "webpacker", "= 3.5.5"
gem "trailblazer-rails"

group :development do
  gem "annotate"
  gem "better_errors"
  gem "binding_of_caller"
  gem "bullet"
  gem "html2slim"
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "meta_request"
  gem "rails-erd", "1.5.0"
  gem "rubocop", require: false
  gem "rubocop-rspec"
end

group :development, :test do
  gem "awesome_print", require: "ap"
  gem "guard"
  gem "guard-rspec"
  gem "guard-rubocop"
  gem "pry-byebug"
  gem "pry-rails"
  gem "rspec-rails"
  gem "rspec_api_documentation"
end

group :test do
  gem "database_rewinder"
  gem "fuubar"
  gem "rspec_junit_formatter", "~> 0.4.1"
  gem "vcr"
  gem "webmock"
end

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

gem "carrierwave"
gem "carrierwave-i18n"
gem "rmagick"
gem "active_decorator", "~> 1.0.0"
gem "fog"
gem "foreman", "~> 0.82.0"
gem "health-monitor-rails", "~> 7.2"
gem "redis-namespace", "~> 1.6"
gem "sidekiq", "~> 5.1"
gem "slim-rails", "~> 3.1", ">= 3.1.3"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: %i[mri mingw x64_mingw]
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "web-console", ">= 3.3.0"
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  # Use 1.5.0 not 1.5.2 (see https://github.com/voormedia/rails-erd/issues/273)
  gem "rails-erd", "1.5.0"
end

group :development do
  gem "better_errors"
  gem "binding_of_caller"
  gem "bullet"
  gem "html2slim"
  gem "meta_request"
  gem "rubocop", require: false
  gem "rubocop-rspec"
end

group :development, :test do
  gem "awesome_print", require: "ap"
  gem "factory_bot_rails"
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
  gem "vcr"
  gem "webmock"
end

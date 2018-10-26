require_dependency Rails.root.join("config/settings/default.rb")
require_dependency Rails.root.join("config/settings/#{Rails.env}.rb")

module RequestHeaderJson
  extend ActiveSupport::Concern

  included do
    header 'Content-Type', 'application/json'
    header 'Accept', 'application/json'
  end
end

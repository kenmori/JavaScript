# frozen_string_literal: true

json.user do
  json.extract! @resource, :id, :email
end
json.token @token

# frozen_string_literal: true

json.histories do
  json.array!(@histories) do |history|
    json.extract! history, :diffs, :created_at
    json.user do
      json.extract! history.user, :id, :first_name, :last_name, :avatar_url, :disabled
    end
  end
end

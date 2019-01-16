# frozen_string_literal: true

json.histories do
  json.array!(@histories) do |history|
    json.extract! history, :object_changes, :created_at, :user
  end
end

# frozen_string_literal: true

json.histories do
  json.array!(@histories) do |history|
    json.extract! history, :diffs, :created_at, :user
  end
end

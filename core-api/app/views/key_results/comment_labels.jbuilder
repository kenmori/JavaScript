# frozen_string_literal: true

json.labels do
  json.array! @labels do |label|
    json.extract! label, :id, :name, :color
  end
end

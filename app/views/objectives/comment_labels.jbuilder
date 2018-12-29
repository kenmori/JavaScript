# frozen_string_literal: true

json.labels do
  json.array! @objective_labels do |label|
    json.extract! label, :id, :name, :color
  end
end

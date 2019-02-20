# frozen_string_literal: true

json.objectives do
  json.partial! "objectives/with_key_results", collection: @objectives, as: :objective
end

json.allObjectives do
  json.partial! "objectives/objective", collection: @all_objectives, as: :objective
end

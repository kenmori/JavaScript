json.objectives do
  json.partial! 'objectives/with_key_results', collection: @objectives, as: :objective
end

json.objectives do
  json.partial! 'objectives/with_key_result', collection: @objectives, as: :objective
end

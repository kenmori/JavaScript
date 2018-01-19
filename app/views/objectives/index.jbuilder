json.objectives do
  json.partial! 'objectives/objective', collection: @objectives, as: :objective
end
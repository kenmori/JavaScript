json.key_result do
  json.extract! @key_result, :id, :disabled

  json.descendant_objectives do
    json.partial! 'objectives/descendant', collection: @key_result.descendant_objectives, as: :objective
  end
end

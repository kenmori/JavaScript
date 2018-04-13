json.objectives do
  json.array!(@objectives) do |objective|
    json.partial!(objective)

    json.child_objectives do
      json.partial! 'objectives/objective', collection: objective.child_objectives, as: :objective
    end
  end
end

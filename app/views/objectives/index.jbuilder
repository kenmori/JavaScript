json.objectives do
  json.array!(@objectives) do |objective|
    json.partial!(objective)
  end
end

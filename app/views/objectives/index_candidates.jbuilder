json.array! @objectives do |objective|
  json.extract! objective, :id, :name, :progress_rate, :disabled

  json.owner do
    json.extract! objective.owner, :id, :first_name, :last_name, :avatar_url, :disabled
  end
end

json.users do
  json.array!(@users) do |user|
    json.partial!(user)
  end
end

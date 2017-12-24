json.users do
  json.array!(@users) do |user|
    json.id user.id
    json.first_name user.first_name
    json.last_name user.last_name
    json.email user.email
    json.avatar_url user.avatar_url
    json.owner_id user.owner_id
    json.organization_name user.organization.name
    json.unconfirmed_email user.unconfirmed_email
    json.confirmed_at user.confirmed_at
  end
end

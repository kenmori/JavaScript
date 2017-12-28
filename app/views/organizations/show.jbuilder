json.organization do
    json.partial!(@organization)
    json.members do
        json.array!(@organization.members) do |user|
            json.id user.id
            json.first_name user.first_name
            json.last_name user.last_name
            json.email user.email
            json.avatar_url user.avatar_url
            json.owner_id user.owner_id
            json.unconfirmed_email user.unconfirmed_email
            json.confirmed_at user.confirmed_at
            json.is_admin user.admin?
        end
    end 
end
  
json.organization do
  json.partial! 'organizations/organization', organization: @organization

  json.okr_periods do
    json.partial! 'okr_periods/okr_period', collection: @organization.okr_periods.order(:month_start), as: :okr_period
  end

  json.users @organization.users do |user|
    json.id user.id
    json.first_name user.first_name
    json.last_name user.last_name
    json.email user.email
    json.avatar_url user.avatar_url
    json.organization_name @organization.name
    json.unconfirmed_email user.unconfirmed_email
    json.disabled user.disabled
    json.is_admin user.admin?
  end
end
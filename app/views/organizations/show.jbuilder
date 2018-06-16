json.organization do
  json.partial! @organization

  json.okr_periods do
    json.partial! 'okr_periods/okr_period', collection: @organization.okr_periods.order(:month_start), as: :okr_period
  end

  json.users do
    json.partial! 'users/user', collection: @organization.users, as: :user
  end
end

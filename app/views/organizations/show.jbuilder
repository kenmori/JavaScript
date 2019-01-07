# frozen_string_literal: true

json.organization do
  json.partial! @organization

  json.okr_periods do
    json.array! @organization.okr_periods do |okr_period|
      json.extract! okr_period, :id, :name, :start_date, :end_date
    end
  end

  json.users do
    json.array! @organization.users do |user|
      json.extract! user, :id, :first_name, :last_name, :avatar_url, :sign_in_at
      json.disabled !!user.disabled_at || @organization.disabled
      json.email user.unconfirmed_email || user.email
      json.is_confirming !user.confirmed? || user.unconfirmed_email
      json.is_admin user.admin?

      json.departments do
        json.partial! "departments/department", collection: user.departments, as: :department
      end
    end
  end
end

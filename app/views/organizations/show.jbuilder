# frozen_string_literal: true

json.organization do
  json.partial! @organization

  json.okr_periods do
    # TODO: partial! が激遅なのでインライン展開する
    # json.partial! 'okr_periods/okr_period', collection: @organization.okr_periods, as: :okr_period
    json.array! @organization.okr_periods do |okr_period|
      json.extract! okr_period, :id, :name, :start_date, :end_date
    end
  end

  json.users do
    # TODO: partial! が激遅なのでインライン展開する
    # json.partial! 'users/user', collection: @organization.users, as: :user
    json.array! @organization.users do |user|
      json.extract! user, :id, :first_name, :last_name, :avatar_url, :disabled, :sign_in_at
      json.email user.unconfirmed_email || user.email
      json.is_confirming !user.confirmed? || user.unconfirmed_email
      json.is_admin user.admin?
    end
  end
end

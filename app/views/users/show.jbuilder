# frozen_string_literal: true

json.user do
  json.partial! @user
  json.setting do
    json.partial! @user.user_setting
  end

  json.organization do
    json.partial! @organization

    json.owner do
      json.partial! @organization.owner
    end

    json.current_okr_period do
      json.partial! @organization.current_okr_period
    end
  end
end

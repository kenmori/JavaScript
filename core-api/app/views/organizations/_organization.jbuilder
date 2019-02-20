# frozen_string_literal: true

json.extract! organization, :id, :name, :logo, :okr_span
json.slack_enabled organization.slack_access_token.present?

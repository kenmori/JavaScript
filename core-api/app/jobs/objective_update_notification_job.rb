# frozen_string_literal: true

class ObjectiveUpdateNotificationJob < ApplicationJob
  retry_on Slack::Web::Api::Error, wait: :exponentially_longer, attempts: 10

  def perform(objective, operator)
    organization = objective.okr_period.organization
    history = ActiveModelSerializers::SerializableResource.new(objective.versions.last).as_json
    diff = history[:diffs].first
    base_url = "#{ActionMailer::Base.default_url_options[:protocol]}://#{ActionMailer::Base.default_url_options[:host]}"

    attachments = [{
      fallback: "#{operator.last_name} #{operator.first_name} がObjectiveを更新しました",
      pretext: "*#{operator.last_name} #{operator.first_name}* がObjectiveを更新しました",
      color: "#36a64f",
      author_name: "Resily",
      author_link: base_url,
      title: objective.name,
      title_link: "#{base_url}/objectives/#{objective.id}",
      text: "*#{diff[:column]}* を `#{diff[:before]}` から `#{diff[:after]}` に更新",
      footer: base_url,
      ts: objective.updated_at.to_i,
      mrkdwn_in: ["text", "pretext"]
    }]

    client = SlackClientFactory.create_web_client(organization.slack_bot_access_token)
    client.auth_test
    client.chat_postMessage(channel: organization.slack_channel, attachments: attachments)
  end
end

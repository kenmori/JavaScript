# frozen_string_literal: true

class ObjectiveCommentPostNotificationJob < ApplicationJob
  retry_on Slack::Web::Api::Error, wait: :exponentially_longer, attempts: 10

  def perform(comment, operator)
    objective = comment.objective
    organization = objective.okr_period.organization
    base_url = "#{ActionMailer::Base.default_url_options[:protocol]}://#{ActionMailer::Base.default_url_options[:host]}"
    attachments = [{
      fallback: "#{operator.last_name} #{operator.first_name} がアナウンスメントを投稿しました",
      pretext: "*#{operator.last_name} #{operator.first_name}* がアナウンスメントを投稿しました",
      color: "#21ba45",
      author_name: "Resily",
      author_link: base_url,
      title: objective.name,
      title_link: "#{base_url}/objectives/#{objective.id}",
      text: comment.text,
      footer: base_url,
      ts: comment.created_at.to_i,
      mrkdwn_in: %w[text pretext]
    }]

    client = SlackClientFactory.create_web_client(organization.slack_access_token)
    client.auth_test
    client.chat_postMessage(channel: organization.slack_channel, attachments: attachments)
  end
end

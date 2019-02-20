# frozen_string_literal: true

class KeyResultCommentPostNotificationJob < ApplicationJob
  retry_on Slack::Web::Api::Error, wait: :exponentially_longer, attempts: 10

  def perform(comment, operator)
    title = "コメント"
    key_result = comment.key_result
    if comment.key_result_comment_label.present?
      title = comment.key_result_comment_label.name
    end

    organization = key_result.okr_period.organization
    base_url = "#{ActionMailer::Base.default_url_options[:protocol]}://#{ActionMailer::Base.default_url_options[:host]}"
    attachments = [{
      fallback: "#{operator.last_name} #{operator.first_name} が#{title}を投稿しました",
      pretext: "*#{operator.last_name} #{operator.first_name}* が#{title}を投稿しました",
      color: to_color_code(comment.key_result_comment_label&.color),
      author_name: "Resily",
      author_link: base_url,
      title: key_result.name,
      title_link: "#{base_url}/key_results/#{key_result.id}",
      text: "```#{comment.text}```",
      footer: base_url,
      ts: comment.created_at.to_i,
      mrkdwn_in: %w[text pretext]
    }]

    client = SlackClientFactory.create_web_client(organization.slack_access_token)
    client.auth_test
    client.chat_postMessage(channel: organization.slack_channel, attachments: attachments)
  end

  private

    def to_color_code(color_name)
      color = "#4a6785"

      case color_name
      when "blue"
        color = "#2185d0"
      when "teal"
        color = "#00b5ad"
      when "pink"
        color = "#e03997"
      when "red"
        color = "#db2828"
      end

      color
    end
end

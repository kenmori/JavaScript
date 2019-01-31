# frozen_string_literal: true

class KeyResult::History < Trailblazer::Operation
  step Model(KeyResult, :find_by)
  step Policy::Pundit(KeyResultPolicy, :history?)
  step :version
  step :comment
  step :merge

  def version(options, params:, **_metadata)
    options[:versions] = options[:model].versions.reverse
  end

  def comment(options, params:, **_metadata)
    options[:comments] = options[:model].comments.includes(%i[user key_result_comment_label])
  end

  def merge(options, params:, **_metadata)
    # それぞれのモデルをマージして降順のリストにする
    options[:histories] = options[:versions]
                          .concat(options[:comments])
                          .sort_by(&:created_at)
                          .reverse
  end
end

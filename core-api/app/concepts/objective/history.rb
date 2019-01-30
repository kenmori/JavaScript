# frozen_string_literal: true

class Objective::History < Trailblazer::Operation
  step Model(Objective, :find_by)
  step Policy::Pundit(ObjectivePolicy, :history?)
  step :version
  step :comment
  step :merge

  def version(options, params:, **_metadata)
    options[:versions] = options[:model].versions.reverse
  end

  def comment(options, params:, **_metadata)
    options[:comments] = options[:model].objective_comments
  end

  def merge(options, params:, **_metadata)
    # それぞれのモデルをマージして降順のリストにする
    options[:histories]= options[:versions]
      .concat(options[:comments])
      .sort_by {|e| e.created_at}
      .reverse
  end
end

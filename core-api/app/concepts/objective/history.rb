# frozen_string_literal: true

class Objective::History < Trailblazer::Operation
  step Model(Objective, :find_by)
  step Policy::Pundit(ObjectivePolicy, :history?)
  step :history

  def history(options, params:, **_metadata)
    options[:histories] = options[:model].versions.reverse
  end
end

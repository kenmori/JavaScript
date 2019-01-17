# frozen_string_literal: true

class KeyResult::History < Trailblazer::Operation
  step Model(KeyResult, :find_by)
  step Policy::Pundit(KeyResultPolicy, :history?)
  step :history

  def history(options, params:, **_metadata)
    options[:histories] = options[:model].versions.reverse
  end
end

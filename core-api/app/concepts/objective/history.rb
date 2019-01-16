# frozen_string_literal: true

class Objective::History < Trailblazer::Operation
  class Form < Reform::Form
    property :id, writeable: false
    property :organization_id, writeable: false, virtual: true

    validates :id, VH[:required, :natural_number]
    validates :organization_id, VH[:required, :natural_number]
  end

  step Model(Objective, :find_by)
  step Policy::Pundit(ObjectivePolicy, :history?)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step :history

  def history(options, params:, **_metadata)
    histories = options[:model].versions.reverse
    histories.map do |e|
      object_changes = JSON.parse(e.object_changes)
      new_object_changes = {}
      object_changes.each_key do |k|
        new_object_changes[I18n.t("activerecord.attributes.objective.#{k}")] = object_changes[k]
      end
      e.object_changes = new_object_changes.to_json
    end

    options[:histories] = histories
  end
end

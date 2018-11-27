# frozen_string_literal: true

require_relative "abstract_active_record_factory"

class DepartmentObjectiveFactory < AbstractActiveRecordFactory
  def initialize(department:, objective:)
    super(DepartmentObjective.new)
    @department = department
    @objective = objective
  end
  attr_reader :department, :objective

  private

    def default_params
      {
        department_id: department.id,
        objective_id: objective.id,
      }
    end
end

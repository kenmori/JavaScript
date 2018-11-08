# frozen_string_literal: true

module ValidationHelper
  VALIDATES_ATTRS_DSL = {
    required: { presence: true },
    default_text_field: { length: { maximum: 40, allow_blank: true } }
  }.freeze

  class << self
    def call(*names)
      params = VALIDATES_ATTRS_DSL.values_at(*names)
      params.each_with_object({}) { |param, result| result.merge!(param) }
    end
    alias [] call

    def existence_of(klass, id_column_name)
      lambda {
        return if __send__(id_column_name).blank?

        unless klass.exists?(id: __send__(id_column_name))
          errors.add(id_column_name, :not_found)
        end
      }
    end
  end
end

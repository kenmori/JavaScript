# frozen_string_literal: true

module ValidationHelper
  # NOTE 他の述語が必要な場合は追加してください
  VALIDATES_ATTRS_DSL = {
    required: { presence: true },
    short_text_field: { length: { maximum: 40, allow_blank: true } },
    middle_text_field: { length: { maximum: 225, allow_blank: true } },
    email: { format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i, allow_blank: true } },
    boolean: { inclusion: { in: [true, false] } },
    integer_number: {
      numericality: {
        only_integer: true,
        allow_blank: true,
        greater_than_or_equal_to: -2_147_483_648,
        less_than_or_equal_to: 2_147_483_647
      }
    },
    natural_number: {
      numericality: {
        only_integer: true,
        allow_blank: true,
        greater_than_or_equal_to: 0,
        less_than_or_equal_to: 2_147_483_647
      }
    }
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

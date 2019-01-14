# frozen_string_literal: true

module CastBoolean
  class << self
    def call(input, default: false)
      case input.to_s.downcase
      when "true"
        true
      when "false"
        false
      when ""
        default
      else
        input
      end
    end
    alias [] call
  end
end

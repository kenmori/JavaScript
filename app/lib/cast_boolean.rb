module CastBoolean
  class << self
    def call(input)
      case input.to_s.downcase
      when 'true'
        true
      when 'false', ''
        false
      else
        input
      end
    end
    alias [] call
  end
end

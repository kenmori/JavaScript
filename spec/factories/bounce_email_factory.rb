# frozen_string_literal: true

require_relative "abstract_factory"

class BounceEmailFactory < AbstractFactory
  def initialize
    super(BounceEmail.new)
  end

  private

    def default_params
      {
        email: "bounced@example.com",
        sent_at: Time.zone.now
      }
    end
end

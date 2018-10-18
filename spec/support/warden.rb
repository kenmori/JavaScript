# frozen_string_literal: true

RSpec.shared_context "enable warden test mode" do
  include Warden::Test::Helpers

  before do
    Warden.test_mode!
  end

  after do
    Warden.test_reset!
  end

  alias_method :sign_in, :login_as
  alias_method :sign_out, :logout
end

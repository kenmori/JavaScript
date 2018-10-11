RSpec.shared_context 'enable warden test mode', warden: true do
  include Warden::Test::Helpers

  before(:each) do
    Warden.test_mode!
  end

  after(:each) do
    Warden.test_reset!
  end

  alias sign_in login_as
  alias sign_out logout
end

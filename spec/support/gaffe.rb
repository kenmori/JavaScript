RSpec.shared_context 'enable gaffe' do
  before do
    Rails.application.env_config['action_dispatch.show_detailed_exceptions'] = false
    Rails.application.env_config['action_dispatch.show_exceptions'] = true
  end

  after do
    Rails.application.env_config['action_dispatch.show_detailed_exceptions'] = true
    Rails.application.env_config['action_dispatch.show_exceptions'] = false
  end
end

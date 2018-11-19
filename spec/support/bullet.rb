# frozen_string_literal: true

RSpec.shared_context "disable bullet" do
  before do |example|
    puts <<-EOS
      \e[0;33mWARNING: Disable Bullet
        #{example.full_description}\e[0m
        \e[0;36m#{example.location}\e[0m
    EOS
    Bullet.enable = false
  end

  after do
    Bullet.enable = true
    Bullet.bullet_logger = true
    Bullet.raise = true
    Bullet.unused_eager_loading_enable = false
    Bullet.counter_cache_enable = false
  end
end

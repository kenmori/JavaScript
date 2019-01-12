# frozen_string_literal: true

# 参考: http://dry-rb.org/gems/dry-configurable/
# 参考: https://qiita.com/kbaba1001/items/3ef799a688fd65661ad9
class Settings
  extend Dry::Configurable

  setting :department do
    setting :default_name, "代表"
  end
end

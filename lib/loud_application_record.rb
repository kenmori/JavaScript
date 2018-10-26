# frozen_string_literal: true

# create! や destroy! を実行する時に STDOUT にログを出す。
# 主に data_migarte 等でデータ投入する時に使う。
module LoudApplicationRecord
  refine ApplicationRecord.singleton_class do
    def create!(*args, &block)
      super.tap do |result|
        text = "Create: "
        print "\e[1;32m#{text}\e[0m"   # 緑色
        p result
      end
    end
  end

  refine ApplicationRecord do
    def destroy!
      super.tap do |result|
        text = "Destroy: "
        print "\e[1;31m#{text}\e[0m"   # 赤色
        p result
      end
    end
  end
end

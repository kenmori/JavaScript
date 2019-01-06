# frozen_string_literal: true

# NOTE USAGE
# concepts で Contract::Build の constant に対して current_user を渡したいときに使用する builder です。
# 例えば、次のようにしてください。
#
# class User::Create < Trailblazer::Operation
#   class Form < Reform::Form
#     property :current_user, virtual: true
#   end
#
#   step Model(User, :new)
#   step Contract::Build(constant: Form, builder: ContractWithCurrentUser)
# end
#
# Form で `property :current_user` を定義することで Form 内で current_user にアクセスできるようになります。
#
# concept を呼び出す側では
#
# User::Create.call(params: params, current_user: user)
#
# のようにして `current_user` を渡してください。
#
module ContractWithCurrentUser
  class << self
    def call(_options, constant:, model:, current_user:, **)
      constant.new(model, current_user: current_user)
    end
  end
end

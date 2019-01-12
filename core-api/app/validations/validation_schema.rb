# frozen_string_literal: true

# NOTE バリデーションを複数のクラスで流用できるようにするためのクラス。
# ValidationSchema を継承したクラスを作ってください。
#
# サブクラスでは setting にキー名と lambda を渡すことで状況(context)毎のバリデーションを
# 定義することが出来ます。
#
# 例)
# class DepartmentValidation < ValidationSchema
#   setting :default, -> {
#     validates :name, presence: true
#   }
#   setting :create, -> {
#     validates :owner_id, presence:true
#   }
# end
#
# DepartmentValidation をバリデーションを定義したいクラスで include します。
#
# 例えば、
#
# class Department < ApplicationRecord
#   include DepartmentValidation.new(:default)
# end
#
# とした場合には
#
# class Department < ApplicationRecord
#   validates :name, presence: true
# end
#
# と同様の振る舞いをします。
#
# new で :default のみ指定する場合には引数を省略できます。
# つまり次のように書くことも出来ます。
#
# class Department < ApplicationRecord
#   include DepartmentValidation.new
# end
#
# また、 new の引数に複数の状況(context)を指定することも出来ます。
#
# class Department < ApplicationRecord
#   include DepartmentValidation.new(:default, :create)
# end
#
# この場合、次と同等の振る舞いをします。
#
# class Department < ApplicationRecord
#   validates :name, presence: true
#   validates :owner_id, presence:true
# end

class ValidationSchema < Module
  class_attribute :contexts
  self.contexts = HashWithIndifferentAccess.new

  class << self
    def setting(name, lambda)
      self.contexts = contexts.merge(name => lambda)
    end
  end

  def initialize(*use_contexts)
    @use_contexts = use_contexts
  end

  def included(base)
    lambdas =
      if @use_contexts.empty?
        [contexts[:default]]
      else
        @use_contexts.map { |context| contexts.fetch(context) }
      end

    lambdas.each do |schema|
      base.instance_exec(&schema)
    end
  end
end

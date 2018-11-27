class Department::Destroy < Trailblazer::Operation
  class Form < Reform::Form
    property :id

    # ■無効化できる時の条件
    # * [x] 下位部署がない
    # * [x] その部署にユーザが属していない
    # * [ ] 部署に紐づくOKRがある場合でも無効化できる

    validate -> {
      if model.has_children?
        errors.add(:base, :must_not_have_children)
      end
    }
    validate -> {
      if model.members.present?
        errors.add(:base, :members_must_not_belong)
      end
    }
  end

  step Model(Department, :find_by)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :delete_record

  def delete_record(options, model:, params:, **_metadata)
    # :new: 管理者として、部署を削除 （無効化）したい
    #
    # 部署は削除は出来ず、削除とは無効化処理のことをさす。
    # 現状、ユーザーを削除すると無効状態となる。これはプロフィール画像がグレーになって[無効]というバッチがつく。このような処理を部署でもやりたい。
    # 無効化はアーカイブと捉えたほうが良さそう。
    #
    # ■他のアクションへの対応
    # get系ではactiveかどうかを返す必要がある。
    # activeな部署だけを返すような機能も必要かもしれない。scopeは少なくともいる


    # model.soft_destroy
    model.soft_destroy  # true/falseを返す
  end
end

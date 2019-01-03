# frozen_string_literal: true

class AddObjectiveCommentLabel < ActiveRecord::Migration[5.2]
  using LoudApplicationRecord

  def up
    # 全組織に対して初期マスタレコードを追加する
    ApplicationRecord.transaction do
      Organization.all.each do |organization|
        PresetObjectiveCommentLabels::Objective::DEFAULT_LABELS.each do |tag|
          next if ObjectiveCommentLabel.exists?(name: tag[:name], color: tag[:color], organization: organization)

          ObjectiveCommentLabel.create!(
            name: tag[:name],
            color: tag[:color],
            organization: organization
          )
        end
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end

class ChangeCommentLabels < ActiveRecord::Migration[5.2]
  def up
    ApplicationRecord.transaction do
      Organization.all.each do |organization|
        ObjectiveCommentLabel.where(name: '健康・健全性').update_all(name: 'アナウンスメント')
        KeyResultCommentLabel.delete_all(name: '健康・健全性')
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end

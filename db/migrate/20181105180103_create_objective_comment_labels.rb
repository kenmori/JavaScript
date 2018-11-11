class CreateObjectiveCommentLabels < ActiveRecord::Migration[5.2]
  def change
    create_table :objective_comment_labels do |t|
      t.string :name
      t.string :color
      t.bigint :organization_id

      t.timestamps
    end
  end
end

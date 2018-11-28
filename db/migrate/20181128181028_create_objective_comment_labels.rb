class CreateObjectiveCommentLabels < ActiveRecord::Migration[5.2]
  def change
    create_table :objective_comment_labels do |t|
      t.string :name
      t.string :color

      t.references :organization, foreign_key: true
      t.timestamps
    end
    add_reference :objective_comments, :objective_comment_label, foreign_key: true
  end
end

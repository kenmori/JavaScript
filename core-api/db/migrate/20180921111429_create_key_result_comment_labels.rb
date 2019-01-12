class CreateKeyResultCommentLabels < ActiveRecord::Migration[5.1]
  def change
    create_table :key_result_comment_labels do |t|
      t.string  :name,       null: false
      t.string  :color,      null: false

      t.references :organization, foreign_key: true
      t.timestamps
    end
    add_reference :comments, :key_result_comment_label, foreign_key: true
  end
end

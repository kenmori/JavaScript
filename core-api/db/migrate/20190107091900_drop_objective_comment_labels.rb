class DropObjectiveCommentLabels < ActiveRecord::Migration[5.2]
  def change
    remove_column :objective_comments, :objective_comment_label_id
    drop_table :objective_comment_labels
  end
end

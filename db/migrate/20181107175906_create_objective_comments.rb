class CreateObjectiveComments < ActiveRecord::Migration[5.2]
  def change
    create_table :objective_comments do |t|
      t.integer :objective_id
      t.integer :user_id
      t.text :text
      t.integer :objective_comment_id
      t.boolean :show_meeting_board

      t.timestamps
    end
  end
end

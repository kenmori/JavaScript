class CreateObjectiveComments < ActiveRecord::Migration[5.2]
  def change
    create_table :objective_comments do |t|
      t.integer :objective_id
      t.integer :user_id
      t.text :text
      t.boolean :show_meeting_board, default: false

      t.timestamps
    end
  end
end

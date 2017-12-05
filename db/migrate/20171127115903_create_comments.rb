class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.integer :key_result_id, null: false
      t.integer :user_id, null: false
      t.text :text, null: false
      t.timestamps
    end
  end
end

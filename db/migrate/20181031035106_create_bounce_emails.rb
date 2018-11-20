class CreateBounceEmails < ActiveRecord::Migration[5.2]
  def change
    create_table :bounce_emails do |t|
      t.string :email, null: false
      t.datetime :sent_at, null: false

      t.timestamps
    end
    add_index :bounce_emails, :email, unique: true
  end
end

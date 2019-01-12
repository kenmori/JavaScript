class CreateObjectiveOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :objective_orders do |t|
      t.integer :user_id, null: false
      t.integer :okr_period_id, null: false
      t.string :list
      t.timestamps
    end
  end
end

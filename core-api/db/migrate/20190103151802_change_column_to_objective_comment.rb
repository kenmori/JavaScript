class ChangeColumnToObjectiveComment < ActiveRecord::Migration[5.2]
  def change
    change_column :objective_comments, :show_meeting_board, :boolean, default: true
  end
end

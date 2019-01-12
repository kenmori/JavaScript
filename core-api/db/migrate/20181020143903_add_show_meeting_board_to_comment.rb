class AddShowMeetingBoardToComment < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :show_meeting_board, :boolean, default: true, null: false
  end
end

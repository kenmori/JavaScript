class RenameMemberIdColumnToConcernedPeople < ActiveRecord::Migration[5.1]
  def change
    rename_column :concerned_people, :member_id, :user_id
  end
end

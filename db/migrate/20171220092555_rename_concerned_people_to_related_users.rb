class RenameConcernedPeopleToRelatedUsers < ActiveRecord::Migration[5.1]
  def change
    rename_table :concerned_people, :related_users
  end
end

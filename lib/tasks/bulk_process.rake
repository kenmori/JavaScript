# frozen_string_literal: true
require 'csv'

namespace :bulk_process do
  desc "Bulk insert user from CSV"
  task :user, ["organization_id", "csv_path"] => :environment do |_, args|
    # expect format.
    # no, last_name, first_name, email, password
    organization = Organization.find(args.organization_id)
    puts "Organization id=#{organization.id} name=#{organization.name}"
    puts "Load from #{args.csv_path}"

    ApplicationRecord.transaction do
      registered = 0
      CSV.foreach(args.csv_path, headers: true).with_index(1) do |row, idx|
        user = organization.users.find_or_initialize_by(email: row["email"])
        user.last_name = row["last_name"]
        user.first_name = row["first_name"]
        user.password = row["password"]
        user.save!
        registered = idx
      end
      puts "Number of registered users #{registered}"
    end
  end
end

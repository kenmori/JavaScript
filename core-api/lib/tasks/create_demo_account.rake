# frozen_string_literal: true

namespace :create_demo_account do
  desc "Create demo account."

  task :find, %w[organization_id] => :environment do |_, args|
    organization = Organization.find(args.organization_id)
    okr_period = OkrPeriod.where(organization_id: organization.id)
    members = OrganizationMember.where(organization_id: organization.id)

    owner = {}
    users = []
    objectives = []
    objective_comments = []
    key_results = []
    key_result_comments = []
    members.each do |member|
      user = User.find(member.user_id)
      users.push(user)
      if member.role == "owner"
        owner = user
      end

      okr_period.each do |period|
        objectives_per_period = user.objectives.includes(:key_results).where(okr_period_id: period.id)

        if (objectives_per_period.length != 0)
          objectives.push(objectives_per_period)

          objectives_per_period.each do |objective|
            o_comments = objective.objective_comments
            objective_comments.push(o_comments) unless o_comments.length == 0
          end
        end

        key_results_per_period = user.key_results.where(okr_period_id: period.id)

        if (key_results_per_period.length != 0)
          key_results.push(key_results_per_period)

          key_results_per_period.each do |key_result|
            kr_comments = key_result.comments
            key_result_comments.push(kr_comments) unless kr_comments.length == 0
          end

        end
      end
    end

  end

  task :create, %w[id] => :environment do |_, args|
    puts _
    puts args.id
  end

end

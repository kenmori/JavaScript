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

  task :create, %w[organization_id] => :environment do |_, args|
    base_organization = Organization.find(args.organization_id)
    base_okr_periods = OkrPeriod.where(organization_id: base_organization.id)
    base_members = OrganizationMember.where(organization_id: base_organization.id)

    # organizations, key_result_comment_labels 作成
    organization = Organization.create!(
      name: base_organization.name,
      logo: base_organization.logo,
      okr_span: base_organization.okr_span
    )

    # oke_period 作成
    base_okr_periods.each do |base_okr_period|
      organization.okr_periods.create!(
        start_date: base_okr_period.start_date,
        end_date: base_okr_period.end_date,
        name: base_okr_period.name
      )
    end

    # 指定した Organization に紐づくメンバーを作成
    base_members.each do |base_member|
      puts "=== Get user info from objevctive_members ==="
      base_user = User.find(base_member.user_id)

      # users, organization_member, user_settings 追加
      user = organization.users.create!(
        last_name: base_user.last_name,
        first_name: base_user.first_name,
        email: "demo_#{organization.id}_#{base_user.email}",
        password: "Pass0123",
        admin: base_user.admin,
        confirmed_at: Time.current
      )

      # User に紐づく上位の objective を作成
      base_okr_periods.each do |base_okr_period|
        base_root_objectives_per_period = base_user.objectives.
        includes(:key_results).
        where(okr_period_id: base_okr_period.id).
        where(parent_key_result_id: nil)

        # Objective に紐づく key_result を作成
        base_root_objectives_per_period.each do |base_objective|
          create_child_key_result(base_objective)
        end
      end

    end

    # key_result_members をマッピングから作成

  end

  def create_child_key_result(base_objective)
    base_key_results = base_objective.key_results

    base_key_results.each do |base_key_result|
    # base_comment = base_key_result.comments
      create_child_objective(base_key_result)
    end
  end

  def create_child_objective(base_key_result)
    base_child_objective = base_key_result.child_objectives
  end
end

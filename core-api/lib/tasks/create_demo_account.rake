# frozen_string_literal: true

namespace :create_demo_account do
  desc "Create demo account."

  @objectives = []
  @users = []

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
    puts "=== Organization を作成 ==="
    organization = Organization.create!(
      name: base_organization.name,
      logo: base_organization.logo,
      okr_span: base_organization.okr_span
    )

    # マッピング用の変数
    okr_periods = []

    # oke_period 作成
    puts "=== 期間を作成 ==="
    base_okr_periods.each do |base_okr_period|
      okr_period = organization.okr_periods.create!(
        start_date: base_okr_period.start_date,
        end_date: base_okr_period.end_date,
        name: base_okr_period.name
      )
      okr_periods.push({"base_id" => base_okr_period.id, "new_id" => okr_period.id})
    end

    # マッピング用の変数
    base_users = []

    # 指定した Organization に紐づくメンバーを作成
    base_members.each do |base_member|
      base_user = User.find(base_member.user_id)
      base_users.push(base_user)

      # users, organization_member, user_settings 追加
      puts "=== User を作成 ==="
      user = organization.users.create!(
        last_name: base_user.last_name,
        first_name: base_user.first_name,
        email: "demo_#{organization.id}_#{base_user.email}",
        password: "Pass0123",
        admin: base_user.admin,
        avatar: base_user.avatar,
        confirmed_at: Time.current
      )

      @users.push({"base_id" => base_user.id, "new_id" => user.id})
      puts "=== Debug User #{user.email} ==="
    end

    # Objective と KeyResult 作成
    base_users.each do |base_user|
      base_okr_periods.each do |base_okr_period|
        # 最上位の Objective を作成
        base_root_objectives_per_period = base_user.objectives.
          includes(:key_results).
          where(okr_period_id: base_okr_period.id).
          where(parent_key_result_id: nil).
          order("id")

        okr_period_id = okr_periods.find {|item| item["base_id"] == base_okr_period.id}
        # user_id = @users.find {|item| item["base_id"] == base_user.id}
        # user = User.find(user_id["new_id"])

        base_root_objectives_per_period.each do |base_objective|
          create_objective(okr_period_id, base_objective)
        end
      end
    end
  end

  def create_objective(okr_period_id, base_objective, parent_key_result_id = nil)
    base_objective_members= base_objective.objective_members.where(role: "owner")
    user_id = @users.find {|item| item["base_id"] == base_objective_members[0].id}
    owner_user = User.find(user_id["new_id"])

    puts "=== Objective を作成 ==="
    objective = owner_user.objectives.create!(
      name: base_objective.name,
      description: base_objective.description,
      parent_key_result_id: parent_key_result_id,
      okr_period_id: okr_period_id["new_id"],
      progress_rate: base_objective.progress_rate ? base_objective.progress_rate : nil,
      sub_progress_rate: base_objective.sub_progress_rate,
      result: base_objective.result
    )
    @objectives.push({"base_id" => base_objective.id, "new_id" => objective.id})

    base_objective_comments = base_objective.objective_comments.reorder("id")
    base_objective_comments.each do |base_objective_comment|
      puts "=== Objective comment を作成 ==="
      objective_comment = objective.objective_comments.create!(
        objective_id: objective.id,
        user_id: owner_user.id,
        text: base_objective_comment.text,
        show_meeting_board: base_objective_comment.show_meeting_board
      )
    end

    # 対象の Objective id に紐づく key_result を作成
    create_child_key_result(okr_period_id, base_objective)
  end

  def create_child_key_result(okr_period_id, base_objective)
    base_key_results = base_objective.key_results
    objective_id = @objectives.find {|item| item["base_id"] == base_objective.id}

    base_key_results.each do |base_key_result|
      base_key_result_members = base_key_result.key_result_members.where(role: "owner")
      user_id = @users.find {|item| item["base_id"] == base_key_result_members[0].id}
      owner_user = User.find(user_id["new_id"])

      puts "=== Key Result を作成 ==="

      # User と Objective に紐づけて Key Result を作成
      key_result = owner_user.key_results.create!(
        name: base_key_result.name,
        objective_id: objective_id["new_id"],
        okr_period_id: okr_period_id["new_id"],
        progress_rate: base_key_result.progress_rate,
        target_value: base_key_result.target_value,
        actual_value: base_key_result.actual_value,
        value_unit: base_key_result.value_unit,
        expired_date: base_key_result.expired_date,
        description: base_key_result.description,
        result: base_key_result.result,
        sub_progress_rate: base_key_result.sub_progress_rate,
        status: base_key_result.status
      )

      base_comments = base_key_result.comments.reorder("id")
      base_comments.each do |base_comment|
        comment_user_id = @users.find {|item| item["base_id"] == base_comment.user_id}
        puts "=== Comment を作成 ==="
        comment = key_result.comments.create!(
          user_id: comment_user_id["new_id"],
          text: base_comment.text,
          key_result_comment_label_id: base_comment.key_result_comment_label_id,
          show_meeting_board: base_comment.show_meeting_board
        )
      end

      # TODO : key_result_members を追加する

      base_child_objectives = base_key_result.child_objectives
      puts "=== Child Objective を作成 ==="
      puts "=== debug #{base_child_objectives.inspect} ==="

      base_child_objectives.each do |base_child_objective|
        create_objective(okr_period_id, base_child_objective, key_result.id)
      end

    end
  end

end

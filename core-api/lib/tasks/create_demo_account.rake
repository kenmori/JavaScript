# frozen_string_literal: true

namespace :create_demo_account do
  desc "Create demo account."

  @objectives = []
  @users = []

  task :find, %w[organization_id] => :environment do |_, args|
    base_organization = Organization.find(args.organization_id)
    base_okr_periods = OkrPeriod.where(organization_id: base_organization.id)
    base_members = OrganizationMember.where(organization_id: base_organization.id)

    puts "======================================================================"
    puts "+ Organization name : #{base_organization.name}"
    base_okr_periods.each do |base_okr_period|
      puts "+ Period name : #{base_okr_period.name}"
      puts "  + Period : #{base_okr_period.start_date} ~ #{base_okr_period.end_date}"
    end
    base_members.each do |base_member|
      user = User.find(base_member.user_id)
      puts "-----"
      puts "+ User name : #{user.last_name} #{user.first_name}"
      puts "+ User email : #{user.email}"
    end
    puts "======================================================================"
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

    # oke_period 作成
    puts "=== 期間を作成 ==="
    okr_periods = []
    base_okr_periods.each do |base_okr_period|
      okr_period = organization.okr_periods.create!(
        start_date: base_okr_period.start_date,
        end_date: base_okr_period.end_date,
        name: base_okr_period.name
      )
      okr_periods.push({"base_id" => base_okr_period.id, "new_id" => okr_period.id})
    end

    # 指定した Organization に紐づくメンバーを作成
    base_users = []
    display_users = []
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

      # 元の ID と移行後の ID のマッピング
      @users.push({"base_id" => base_user.id, "new_id" => user.id})
      # 出力用
      display_users.push(user)
    end

    # Objective と KeyResult 作成
    base_users.each do |base_user|
      base_okr_periods.each do |base_okr_period|
        # 最上位の Objective を取得し、そこから下層の Key Result と Objective を作成していく
        base_root_objectives_per_period = base_user.objectives.
          includes(:key_results).
          where(okr_period_id: base_okr_period.id).
          where(parent_key_result_id: nil).
          order("id")

        okr_period_id = okr_periods.find {|item| item["base_id"] == base_okr_period.id}

        base_root_objectives_per_period.each do |base_objective|
          create_objective(okr_period_id, base_objective)
        end
      end
    end

    # ログイン用に最終的に作成されたユーザー情報を出力
    puts "======================================================================"
    display_users.each do |display_user|
      puts "+ Created User : #{display_user.email}"
    end
    puts "======================================================================"
  end

  # Objective 作成
  # Key Result に紐づく下位 Objective を作成する際に parent_key_result_id が渡ってくる
  def create_objective(okr_period_id, base_objective, parent_key_result_id = nil)
    base_objective_members = base_objective.objective_members.where(role: "owner")
    # Objective には Menmer は Owner 一人のみ
    user_id = @users.find {|item| item["base_id"] == base_objective_members[0].user_id}
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

    # 作成した Objective に紐づく Key Result を作成
    create_child_key_result(okr_period_id, base_objective)
  end

  def create_child_key_result(okr_period_id, base_objective)
    base_key_results = base_objective.key_results
    objective_id = @objectives.find {|item| item["base_id"] == base_objective.id}

    base_key_results.each do |base_key_result|
      base_key_result_members = base_key_result.key_result_members
      base_owner_key_result_member = base_key_result_members.find {|member| member.role == "owner"}
      user_id = @users.find {|item| item["base_id"] == base_owner_key_result_member.user_id}
      owner_user = User.find(user_id["new_id"])

      # Owner となる User と Objective に紐づけて Key Result を作成
      puts "=== Key Result を作成 ==="
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

      # Owner 以外の Member（関係者）を作成
      base_key_result_members.each do |base_key_result_member|
        next if base_key_result_member.role == "owner"

        member_user_id = @users.find {|item| item["base_id"] == base_key_result_member.user_id}
        key_result_member = key_result.key_result_members.create!(
          user_id: member_user_id["new_id"],
          role: base_key_result_member.role
        )
      end

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

      puts "=== Child Objective を作成 ==="
      base_child_objectives = base_key_result.child_objectives
      base_child_objectives.each do |base_child_objective|
        create_objective(okr_period_id, base_child_objective, key_result.id)
      end

    end
  end

end

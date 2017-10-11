# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ApplicationRecord.transaction do
  organization = Organization.create!(name: '佐藤株式会社', postal_code: '000-0000', address: '東京都', phone_number: '00-0000-0000')
  organization_group = organization.organization_group
# ログインユーザーを作成
  login_user = User.new(last_name: '山田', first_name: '太郎', email: 'test@example.com', password: 'testtest')
  login_user.skip_confirmation!
  login_user.save!
  organization.members.create!(user_id: login_user.id)
  organization_group.members.create!(user_id: login_user.id)

# 他のユーザーを作成
  another = User.new(last_name: '鈴木', first_name: '太郎', email: 'test2@example.com', password: 'testtest')
  another.skip_confirmation!
  another.save!
  organization.members.create!(user_id: another.id)
  organization_group.members.create!(user_id: another.id)

# ログインユーザーの今期のOKRを作成
  active_okr_period = organization.okr_periods.create!(year: 2017, period_number: 2, status: :active)

  active_objective1 = login_user.owner.objectives.create!(
    name: '新ビジネスのマネタイズを進化させる',
    description: 'description',
    okr_period_id: active_okr_period.id,
    progress_rate: 28
  )
  active_objective1.child_objectives.create!(
    name: '×××をリリース',
    description: '',
    okr_period_id: active_okr_period.id,
    owner_id: login_user.owner_id,
    progress_rate: 26
  )
  active_objective1.child_objectives.create!(
    name: '◯◯◯リリース',
    description: '',
    okr_period_id: active_okr_period.id,
    owner_id: login_user.owner_id,
    progress_rate: 34
  )

# ログインユーザーの前期のOKRを作成
  inactive_okr_period = organization.okr_periods.create!(year: 2017, period_number: 1, status: :inactive)

  inactive_objective1 = login_user.owner.objectives.create!(
    name: '改善系タスクにより主要KPIをX%向上させる',
    description: '主要KPIに注力する',
    okr_period_id: inactive_okr_period.id,
    progress_rate: 55
  )
  inactive_objective1.child_objectives.create!(
    name: '全体検索の速度改善でDAUあたりの利用回数15%改善',
    description: 'クエリチューニングなどを開発により実施する',
    okr_period_id: inactive_okr_period.id,
    owner_id: login_user.owner_id
  )
  inactive_objective1.key_results.create!(
    name: 'クエリチューニングの実施',
    owner_id: login_user.owner_id,
    target_value: '10',
    actual_value: '6',
    value_unit: '%改善',
    progress_rate: 35,
    memo: 'postgresのver upも含めて検討を進めること'

  )
  inactive_objective1.key_results.create!(
    name: 'サーバーの増強',
    owner_id: login_user.owner_id,
    progress_rate: 20,
    expired_date: '2017-10-13',
    memo: '必要なメモリ、CPUを選定した上で増強にかかるコストを算出し承認を得ること。インフラチーム主導で進める。'
  )

# 他のユーザーのOKRを作成
  active_another_objective = another.owner.objectives.create!(
    name: 'ROBOTの仕組み化',
    description: 'description',
    okr_period_id: active_okr_period.id,
    progress_rate: 83
  )
  active_another_objective.child_objectives.create!(
    name: 'SMBで×件受注',
    okr_period_id: active_okr_period.id,
    owner_id: another.owner_id,
    progress_rate: 91
  )
  active_another_objective.child_objectives.create!(
    name: '既存顧客で×件受注',
    okr_period_id: active_okr_period.id,
    owner_id: another.owner_id,
    progress_rate: 70
  )
  active_another_objective.child_objectives.create!(
    name: '大手顧客で×件受注',
    okr_period_id: active_okr_period.id,
    owner_id: another.owner_id
  )

# 開発部の今期のOKRを作成
  development_group = organization.groups.general.create(name: '開発部')
  development_group.members.create(user_id: login_user.id)
  development_group_objective = development_group.owner.objectives.create(
    name: 'ビジネス成長に寄与する機能を開発する',
    description: '要検討',
    okr_period_id: active_okr_period.id,
  )
  development_group_objective.child_objectives.create!(
    name: '×××をリリース',
    description: '',
    okr_period_id: active_okr_period.id,
    owner_id: development_group.owner_id
  )
  development_group_objective.child_objectives.create!(
    name: '◯◯◯リリース',
    description: '',
    okr_period_id: active_okr_period.id,
    owner_id: login_user.owner_id
  )

# マーケティング部の今期のOKRを作成
  marketing_group = organization.groups.general.create(name: 'マーケティング部')
  marketing_group.members.create(user_id: login_user.id)
  marketing_group_objective = marketing_group.owner.objectives.create(
    name: 'ビジネス成長に寄与するマーケティングを実施する',
    description: '要検討',
    okr_period_id: active_okr_period.id
  )
  marketing_group_objective.child_objectives.create(
    name: '×××を実施する',
    description: '',
    okr_period_id: active_okr_period.id,
    owner_id: marketing_group.id
  )
end

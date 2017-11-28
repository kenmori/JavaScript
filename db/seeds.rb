# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ApplicationRecord.transaction do
  organization = Organization.create!(
      name: 'Resily株式会社',
      uniq_name: 'resily'
  )
  organization_group = organization.organization_group

# ログインユーザーを作成
  login_user = User.new(
      last_name: '山田',
      first_name: '太郎',
      email: 'yamada@example.com',
      password: 'Pass0123'
  )
  login_user.skip_confirmation!
  login_user.save!
  organization.organization_members.create!(user_id: login_user.id)
  organization_group.members.create!(user_id: login_user.id)

# 他のユーザーを作成
  another = User.new(
      last_name: '鈴木',
      first_name: '花子',
      email: 'suzuki@example.com',
      password: 'Pass0123'
  )
  another.skip_confirmation!
  another.save!
  organization.organization_members.create!(user_id: another.id)
  organization_group.members.create!(user_id: another.id)

# 他のユーザーを作成
  horie = User.new(
      last_name: '堀江',
      first_name: '真弘',
      email: 'horie@example.com',
      password: 'Pass0123'
  )
  horie.skip_confirmation!
  horie.save!
  organization.organization_members.create!(user_id: horie.id)
  organization_group.members.create!(user_id: horie.id)

  guest = User.new(
      last_name: 'ゲスト',
      first_name: 'ユーザー',
      email: 'guest@example.com',
      password: 'Resily6289'
  )
  guest.skip_confirmation!
  guest.save!
  organization.members.create!(user_id: guest.id)
  organization_group.members.create!(user_id: guest.id)

# ログインユーザーの今期のOKRを作成
  active_okr_period = organization.okr_periods.create!(
      year: 2017,
      period_number: 3,
      status: :active,
      month_start: '2017/10/01',
      month_end: '2017/12/31',
  )

  active_objective1 = login_user.owner.objectives.create!(
    name: '使いやすいサービスを作る',
    description: '事業を成功させるには、少なくとも競合より使いやすいサービスが欲しい。',
    okr_period_id: active_okr_period.id,
    progress_rate: 65
  )
  active_objective1.key_results.create!(
      name: 'イケてるエンジニアを採用する',
      owner_id: login_user.owner_id,
      target_value: 1,
      actual_value: 0,
      value_unit: '人',
      progress_rate: 80,
      expired_date: '2017-11-30'
  )
  active_objective1.key_results.create!(
      name: '正式版をリリースする',
      owner_id: another.owner_id,
      progress_rate: 50,
      expired_date: '2017-11-30'
  )

  active_objective2 = active_objective1.child_objectives.create!(
    name: 'シニアエンジニアを採用する',
    description: '開発を加速するには、シニアエンジニア級のスキルを持ったエンジニアが必要。',
    okr_period_id: active_okr_period.id,
    owner_id: login_user.owner_id,
    progress_rate: 80
  )
  active_objective2.key_results.create!(
      name: '5人を面接する',
      owner_id: login_user.owner_id,
      target_value: 5,
      actual_value: 3,
      value_unit: '人',
      progress_rate: 60,
      expired_date: '2017-11-30'
  )
  active_objective2.key_results.create!(
      name: '採用サービスを2つ利用する',
      owner_id: another.owner_id,
      target_value: 2,
      actual_value: 2,
      value_unit: 'サービス',
      progress_rate: 100,
      expired_date: '2017-10-31'
  )

  active_objective3 = active_objective1.child_objectives.create!(
    name: 'MVP の機能を開発する',
    description: '方針として MVP の機能にフォーカスすることで、確実に正式版のリリース日までに実装を完了する。',
    okr_period_id: active_okr_period.id,
    owner_id: another.owner_id,
    progress_rate: 50
  )
  active_objective3.key_results.create!(
      name: 'ログイン機能を実装する',
      owner_id: another.owner_id,
      progress_rate: 70,
      expired_date: '2017-10-31'
  )
  active_objective3.key_results.create!(
      name: 'ユーザー登録機能を実装する',
      owner_id: another.owner_id,
      progress_rate: 30,
      expired_date: '2017-11-30'
  )

# ログインユーザーの前期のOKRを作成
  inactive_okr_period = organization.okr_periods.create!(
      year: 2017,
      period_number: 2,
      status: :inactive,
      month_start: '2017/7/1',
      month_end: '2017/9/30',
  )

  inactive_objective1 = login_user.owner.objectives.create!(
      name: 'プロトタイプを作る',
      description: 'ビジネスモデルを仮説検証するために実際に動かすことのできるプロトタイプが必須。',
      okr_period_id: inactive_okr_period.id,
      progress_rate: 75
  )
  inactive_objective1.key_results.create!(
      name: 'アプリの仕様をおおまかに決める',
      owner_id: login_user.owner_id,
      progress_rate: 65,
      expired_date: '2017-09-30'
  )
  inactive_objective1.key_results.create!(
      name: 'プロトアプリを動かせるようにする',
      owner_id: another.owner_id,
      progress_rate: 85,
      expired_date: '2017-09-30'
  )

  inactive_objective2 = inactive_objective1.child_objectives.create!(
      name: 'アプリの外部仕様を策定する',
      description: 'プロトタイプを開発するために画面や機能に関する外部仕様が求められる。',
      okr_period_id: inactive_okr_period.id,
      owner_id: login_user.owner_id,
      progress_rate: 65
  )
  inactive_objective2.key_results.create!(
      name: 'ペルソナを絞り込む',
      owner_id: login_user.owner_id,
      target_value: 3,
      actual_value: 3,
      value_unit: '人',
      progress_rate: 100,
      expired_date: '2017-07-31'
  )
  inactive_objective2.key_results.create!(
      name: 'ユーザーストーリーを考える',
      owner_id: login_user.owner_id,
      target_value: 5,
      actual_value: 3,
      value_unit: '個',
      progress_rate: 60,
      expired_date: '2017-07-31'
  )
  inactive_objective2.key_results.create!(
      name: 'ビジネス要件をまとめる',
      owner_id: login_user.owner_id,
      progress_rate: 60,
      expired_date: '2017-08-31'
  )
  inactive_objective2.key_results.create!(
      name: '外部仕様を策定する',
      owner_id: another.owner_id,
      progress_rate: 40,
      expired_date: '2017-09-30'
  )

  inactive_objective3 = inactive_objective1.child_objectives.create!(
      name: 'プロトアプリをサーバーにデプロイする',
      description: '開発環境以外でもアプリを触れるようにするためサーバー上でアプリを動かす。',
      okr_period_id: inactive_okr_period.id,
      owner_id: another.owner_id,
      progress_rate: 85
  )
  inactive_objective3.key_results.create!(
      name: 'ワイヤーフレームを作る',
      owner_id: login_user.owner_id,
      progress_rate: 80,
      expired_date: '2017-07-31'
  )
  inactive_objective3.key_results.create!(
      name: 'モックアップを作る',
      owner_id: another.owner_id,
      progress_rate: 90,
      expired_date: '2017-08-31'
  )
  inactive_objective3.key_results.create!(
      name: 'プロトタイプを実装する',
      owner_id: another.owner_id,
      progress_rate: 70,
      expired_date: '2017-09-30'
  )
  inactive_objective3.key_results.create!(
      name: 'サーバー環境を構築する',
      owner_id: another.owner_id,
      progress_rate: 100,
      expired_date: '2017-09-30'
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
  # development_group_objective.child_objectives.create!(
  #     name: '◯◯◯リリース',
  #     description: '',
  #     okr_period_id: active_okr_period.id,
  #     owner_id: login_user.owner_id
  # )

# マーケティング部の今期のOKRを作成
  marketing_group = organization.groups.general.create(name: 'マーケティング部')
  marketing_group.members.create(user_id: login_user.id)
  marketing_group_objective = marketing_group.owner.objectives.create(
    name: 'ビジネス成長に寄与するマーケティングを実施する',
    description: '要検討',
    okr_period_id: active_okr_period.id
  )
  # marketing_group_objective.child_objectives.create(
  #   name: '×××を実施する',
  #   description: '',
  #   okr_period_id: active_okr_period.id,
  #   owner_id: marketing_group.id
  # )
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ApplicationRecord.transaction do

  ###########
  # 1. Test #
  ###########

  # 組織を作成
  organization = Organization.create!(
      name: 'Test',
  )

  # 組織のコメントタグを作成
  PresetCommentLabels::KeyResult::DEFAULT_LABELS.each do |tag|
    KeyResultCommentLabel.create!(
      name: tag[:name],
      color: tag[:color],
      organization: organization,
    )
  end

  # ユーザーを作成
  login_user = organization.users.create!(
      last_name: '山田',
      first_name: '太郎',
      email: 'yamada@example.com',
      password: 'Pass0123',
      admin: true,
      confirmed_at: Time.current,
  )
  another = organization.users.create!(
      last_name: '鈴木',
      first_name: '花子',
      email: 'suzuki@example.com',
      password: 'Pass0123',
      confirmed_at: Time.current,
  )
  horie = organization.users.create!(
      last_name: '堀江',
      first_name: '真弘',
      email: 'horie@example.com',
      password: 'Pass0123',
      admin: true,
      confirmed_at: Time.current,
  )
  guest = organization.users.create!(
      last_name: 'ゲスト',
      first_name: 'ユーザー',
      email: 'guest@example.com',
      password: 'Ke4nQVXL',
      confirmed_at: Time.current,
  )

  # OKR 期間を作成
  active_okr_period = organization.okr_periods.create!(
      start_date: Date.today,
      end_date: Date.today + 90,
      name: '3Q',
  )
  inactive_okr_period = organization.okr_periods.create!(
      start_date: '2017-09-01',
      end_date: '2017-11-30',
  )

  # 今期 OKR を作成
  active_objective1 = login_user.objectives.create!(
      name: '使いやすいサービスを作る',
      description: '事業を成功させるには、少なくとも競合より使いやすいサービスが欲しい。',
      okr_period_id: active_okr_period.id,
  )
  active_key_result1 = login_user.key_results.create!(
      name: 'イケてるエンジニアを採用する',
      objective_id: active_objective1.id,
      target_value: 1,
      actual_value: 0,
      value_unit: '人',
      expired_date: '2017-11-30'
  )
  active_key_result2 = another.key_results.create!(
      name: '正式版をリリースする',
      objective_id: active_objective1.id,
      expired_date: '2017-11-30'
  )

  active_objective2 = login_user.objectives.create!(
      name: 'シニアエンジニアを採用する',
      description: '開発を加速するには、シニアエンジニア級のスキルを持ったエンジニアが必要。',
      okr_period_id: active_okr_period.id,
      parent_key_result_id: active_key_result1.id,
  )
  login_user.key_results.create!(
      name: '5人を面接する',
      objective_id: active_objective2.id,
      target_value: 5,
      actual_value: 3,
      value_unit: '人',
      progress_rate: 60,
      expired_date: '2017-11-30'
  )
  another.key_results.create!(
      name: '採用サービスを2つ利用する',
      objective_id: active_objective2.id,
      target_value: 2,
      actual_value: 2,
      value_unit: 'サービス',
      progress_rate: 100,
      expired_date: '2017-10-31'
  )

  active_objective3 = another.objectives.create!(
      name: 'MVP の機能を開発する',
      description: '方針として MVP の機能にフォーカスすることで、確実に正式版のリリース日までに実装を完了する。',
      okr_period_id: active_okr_period.id,
      parent_key_result_id: active_key_result2.id,
  )
  another.key_results.create!(
      name: 'ログイン機能を実装する',
      objective_id: active_objective3.id,
      progress_rate: 70,
      expired_date: '2017-10-31'
  )
  another.key_results.create!(
      name: 'ユーザー登録機能を実装する',
      objective_id: active_objective3.id,
      progress_rate: 30,
      expired_date: '2017-11-30'
  )

  # 前期 OKR (Objective and Key Result) を作成
  inactive_objective1 = login_user.objectives.create!(
      name: 'プロトタイプを作る',
      description: 'ビジネスモデルを仮説検証するために実際に動かすことのできるプロトタイプが必須。',
      okr_period_id: inactive_okr_period.id,
  )
  inactive_key_result1 = login_user.key_results.create!(
      name: 'アプリの仕様をおおまかに決める',
      objective_id: inactive_objective1.id,
      expired_date: '2017-09-30'
  )
  inactive_key_result2 = another.key_results.create!(
      name: 'プロトアプリを動かせるようにする',
      objective_id: inactive_objective1.id,
      expired_date: '2017-09-30'
  )

  inactive_objective2 = login_user.objectives.create!(
      name: 'アプリの外部仕様を策定する',
      description: 'プロトタイプを開発するために画面や機能に関する外部仕様が求められる。',
      okr_period_id: inactive_okr_period.id,
      parent_key_result_id: inactive_key_result1.id,
  )
  login_user.key_results.create!(
      name: 'ペルソナを絞り込む',
      objective_id: inactive_objective2.id,
      target_value: 3,
      actual_value: 3,
      value_unit: '人',
      progress_rate: 100,
      expired_date: '2017-07-31'
  )
  login_user.key_results.create!(
      name: 'ユーザーストーリーを考える',
      objective_id: inactive_objective2.id,
      target_value: 5,
      actual_value: 3,
      value_unit: '個',
      progress_rate: 60,
      expired_date: '2017-07-31'
  )
  login_user.key_results.create!(
      name: 'ビジネス要件をまとめる',
      objective_id: inactive_objective2.id,
      progress_rate: 60,
      expired_date: '2017-08-31'
  )
  another.key_results.create!(
      name: '外部仕様を策定する',
      objective_id: inactive_objective2.id,
      progress_rate: 40,
      expired_date: '2017-09-30'
  )

  inactive_objective3 = another.objectives.create!(
      name: 'プロトアプリをサーバーにデプロイする',
      description: '開発環境以外でもアプリを触れるようにするためサーバー上でアプリを動かす。',
      okr_period_id: inactive_okr_period.id,
      parent_key_result_id: inactive_key_result2.id,
  )
  login_user.key_results.create!(
      name: 'ワイヤーフレームを作る',
      objective_id: inactive_objective3.id,
      progress_rate: 80,
      expired_date: '2017-07-31'
  )
  another.key_results.create!(
      name: 'モックアップを作る',
      objective_id: inactive_objective3.id,
      progress_rate: 90,
      expired_date: '2017-08-31'
  )
  another.key_results.create!(
      name: 'プロトタイプを実装する',
      objective_id: inactive_objective3.id,
      progress_rate: 70,
      expired_date: '2017-09-30'
  )
  another.key_results.create!(
      name: 'サーバー環境を構築する',
      objective_id: inactive_objective3.id,
      progress_rate: 100,
      expired_date: '2017-09-30'
  )

  # 開発部 OKR を作成
  development_group = organization.groups.create(name: '開発部')
  development_group.group_members.create(user_id: another.id)
  development_group.owner.objectives.create(
      name: '生産的な開発体制を構築する',
      description: '',
      okr_period_id: inactive_okr_period.id,
  )

  # マーケティング部 OKR 作成
  marketing_group = organization.groups.create(name: 'マーケティング部')
  marketing_group.group_members.create(user_id: login_user.id)
  marketing_group.owner.objectives.create(
      name: 'グローバルマーケティングを実施する',
      description: '',
      okr_period_id: inactive_okr_period.id
  )

end

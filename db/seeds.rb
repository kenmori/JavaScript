# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user_owner = Owner.create(kind: 1)
user = User.new(name: 'test', email: 'test@example.com', password: 'testtest', owner_id: user_owner.id)
user.skip_confirmation!
user.save

organization = Organization.create(name: 'sansan')
group_owner = Owner.create(kind: 2)
group = organization.groups.create(name: 'company', owner_id: group_owner.id)

group.members.create(user_id: user.id)

objective1 = group_owner.objectives.create(name: '改善系タスクにより主要KPIをX%向上させる', description: '主要KPIに注力する')
objective1.child_objectives.create(name: '全体検索の速度改善でDAUあたりの利用回数15%改善', description: 'クエリチューニングなどを開発により実施する')
objective1.key_results.create(name: 'KeyResult1')
objective1.key_results.create(name: 'KeyResult2')

objective2 = group_owner.objectives.create(name: 'ビジネス成長に寄与する機能を開発する', description: '要検討')
objective2.child_objectives.create(name: '×××をリリース', description: '')
objective2.child_objectives.create(name: '◯◯◯リリース', description: '')



# frozen_string_literal: true

module OrganizationDataset
  extend ActiveSupport::Concern

  included do
    let!(:organization) { OrganizationFactory.new.create }
    let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }
    let!(:okr_period) { OkrPeriodFactory.new(organization: organization).create }
    let!(:objective) { ObjectiveFactory.new(user: admin_user, okr_period: okr_period).create }
    let!(:key_result) { KeyResultFactory.new(user: admin_user, objective: objective).create }

    let!(:other_user) do
      UserFactory.new(organization: organization).create(
        email: "other_user@example.com",
        first_name: "園田",
        last_name: "次郎"
      )
    end
    let!(:other_key_result) do
      travel_to(1.second.since) do
        KeyResultFactory.new(user: other_user, objective: objective).create(
          name: "正式版をリリースする",
          expired_date: 3.months.since
        )
      end
    end

    let!(:nomal_user) do
      UserFactory.new(organization: organization).create(
        email: "user2@example.com",
        first_name: "普通",
        last_name: "たろう"
      )
    end

    let!(:other_org) { OrganizationFactory.new.create(name: "other") }
    let!(:other_org_user) do
      UserFactory.new(organization: other_org).create(
        last_name: "花京院",
        first_name: "典明",
        email: "other_org_user@example.com",
        admin: true
      )
    end
    let!(:other_org_okr_period) do
      OkrPeriodFactory.new(
        organization: other_org
      ).create(
        name: "第3部"
      )
    end
    let!(:other_org_objective) do
      ObjectiveFactory.new(
        user: other_org_user,
        okr_period: other_org_okr_period
      ).create(
        name: "DIOを倒す"
      )
    end
    let!(:other_org_key_result) do
      KeyResultFactory.new(
        user: other_org_user,
        objective: other_org_objective
      ).create(
        name: "エジプトに行く"
      )
    end
  end
end

# frozen_string_literal: true

RSpec.describe Department::Create do
  example "" do
    params = {
      name: "開発部",
      display_order: 1,
      organization_id: 1,
      parent_department_id: nil,
      owner_id: 1
    }

    Department::Create.(params: params)
  end
end

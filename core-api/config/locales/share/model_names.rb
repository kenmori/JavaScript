# frozen_string_literal: true

def model_names
  @model_names ||= {
    organization: "組織",
    department: "部署",
    department_member: "部署メンバー",
    user: "ユーザー"
  }
end

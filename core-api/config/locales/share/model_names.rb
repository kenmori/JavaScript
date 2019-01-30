# frozen_string_literal: true

def model_names
  @model_names ||= {
    organization: "組織",
    comment: "コメント",
    department: "部署",
    department_member: "部署メンバー",
    user: "ユーザー",
    objective: "Objective",
    objective_comment: "アナウンスメント",
    key_result: "Key Result",
    okr_period: "OKR期間"
  }
end

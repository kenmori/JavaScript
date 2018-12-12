# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "GET /key_results/comment_labels", warden: true do
  explanation "key_results#comment_labels"

  include OrganizationDataset
  include RequestHeaderJson

  before do
    key_result

    login_as(nomal_user)
  end

  get "/key_results/comment_labels" do
    example "SUCCESS: get comment labels", bullet: false do
      explanation "サインインユーザーの所属する組織のコメントラベルを取得する"

      do_request

      # NOTE Organization の after_create でデフォルトの KeyResultCommentLabel が作られる
      expect(response_status).to eq(200)
      expect(parse_response_body("labels", 0)).to include(
        "id" => a_kind_of(Integer),
        "name" => a_kind_of(String),
        "color" => a_kind_of(String)
      )
      expect(parse_response_body("labels").map { |l| l["name"] }).to contain_exactly(
        "今週の優先事項",
        "今後4週間(プロジェクト)",
        "健康・健全性",
        "ウィンセッション",
        "課題・障害"
      )
    end
  end
end

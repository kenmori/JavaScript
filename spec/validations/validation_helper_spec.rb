RSpec.describe ValidationHelper do
  describe ".call" do
    example "指定した述語に応じてvalidatesのoptionsとして使える値をHashで返す" do
      result = ValidationHelper.call(:required)
      expect(result).to eq({presence: true})
    end

    example "複数の述語を渡すケース" do
      result = ValidationHelper.call(:required, :default_text_field)
      expect(result).to include(
        presence: true,
        length: a_kind_of(Hash)
      )
    end

    example "callと同様に[]も使える" do
      result = ValidationHelper[:required]
      expect(result).to eq({presence: true})
    end
  end

  describe ".existence_of" do
    let(:dummy_class) {
      Class.new {
        def self.name
          'DummyClass'
        end
        include ActiveModel::Model

        attr_accessor :organization_id
        validate ValidationHelper.existence_of(Organization, :organization_id)
      }
    }
    let(:organization) { OrganizationFactory.new.create }

    example "SUCCESS: データが存在するケース" do
      dummy = dummy_class.new(organization_id: organization.id)

      expect(dummy).to be_valid
    end

    example "ERROR: データが存在しないケース" do
      dummy = dummy_class.new(organization_id: 0)

      expect(dummy).not_to be_valid
      expect(dummy.errors[:organization_id]).to eq(["は見つかりませんでした。"])
    end
  end
end

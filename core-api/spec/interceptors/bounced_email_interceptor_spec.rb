# frozen_string_literal: true

RSpec.describe Mailer::BouncedEmailInterceptor do
  describe "#delivering_email" do
    let(:message) { OpenStruct.new(to: ["yamada@example.com"], perform_deliveries: true) }

    shared_examples "message.to does not change" do
      example "message.to does not change" do
        described_class.delivering_email(message)

        expect(message.to).to eq ["yamada@example.com"]
        expect(message.perform_deliveries).to be_truthy
      end
    end

    context "When bounce_emails is empty" do
      it_behaves_like "message.to does not change"
    end

    context "When bounce_emails is not empty" do
      let!(:bounced_emails) { BounceEmailFactory.new.create }

      context "When does not contains bounced email address" do
        it_behaves_like "message.to does not change"
      end

      context "When contains bounced email address" do
        let(:contain_bounce_addresses_message) { OpenStruct.new(to: ["yamada@example.com", "bounced@example.com"], perform_deliveries: true) }
        let(:contain_bounce_address_message) { OpenStruct.new(to: ["bounced@example.com"], perform_deliveries: true) }

        example "message.to rejected bounced email address" do
          described_class.delivering_email(contain_bounce_addresses_message)

          expect(contain_bounce_addresses_message.to).to eq ["yamada@example.com"]
          expect(contain_bounce_addresses_message.perform_deliveries).to be_truthy
        end

        example "message.to rejected bounced email address and perform_deliveries is false" do
          described_class.delivering_email(contain_bounce_address_message)

          expect(contain_bounce_address_message.to).to be_empty
          expect(contain_bounce_address_message.perform_deliveries).to be_falsey
        end
      end
    end
  end
end

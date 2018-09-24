class TrackingMailer < ApplicationMailer

  def create_account(organization)
    @organization = organization
    @user = organization.users.first
    @okr_period = organization.okr_periods.first
    @url = url_for(controller: 'home')

    mail_to = ENV.fetch('TRACKING_MAIL_TO', 'tracking@risily.com')
    if mail_to.present?
      mail to: mail_to,
           subject: '[Resily] 新しいアカウントが作成されました'
    end
  end
end

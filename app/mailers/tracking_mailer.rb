class TrackingMailer < ApplicationMailer

  def create_account(organization)
    @organization = organization
    @user = organization.users.first
    @okr_period = organization.okr_periods.first
    @url = url_for(controller: 'home')

    mail to: ENV.fetch('TRACKING_MAIL_TO', 'iwata@resily.com'),
         subject: '[Resily] 新しいアカウントが作成されました'
  end
end

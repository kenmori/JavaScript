# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include ErrorJsonResponder
  include Pundit

  respond_to :json

  helper_method :current_user
  helper_method :current_organization

  before_action :authenticate_user!
  before_action :set_paper_trail_whodunnit
  around_action :set_current_user

  protected

    #  current_user return decorated devise current_user object
    def current_user
      ActiveDecorator::Decorator.instance.decorate(super) if super.present?
      super
    end

    # current_organization returns current organization
    def current_organization
      @current_organization ||= current_user.organization
    end

    # valid_permission?? is ACL function.
    # verify client request is valid permission.
    def valid_permission?(organization_id)
      current_organization.id == organization_id&.to_i
    end

    # verify current user is owner or admin
    def valid_user?(owner_id)
      current_user.admin? || owner_id == current_user.id
    end

    # Windows IE/Edge によるダウンロードで日本語ファイル名が文字化けする
    # https://qiita.com/rorensu2236/items/638d181e155b5dc5e35c
    def send_file_headers!(options)
      super(options)
      match = /(.+); filename="(.+)"/.match(headers["Content-Disposition"])
      encoded = URI.encode_www_form_component(match[2])
      headers["Content-Disposition"] = "#{match[1]}; filename*=UTF-8''#{encoded}" unless encoded == match[2]
    end

  private

    # Devise の current_user に Model からアクセスするための hack
    # @see https://stackoverflow.com/a/2513456
    def set_current_user
      Current.user = current_user
      yield
    ensure
      Current.user = nil
    end
end

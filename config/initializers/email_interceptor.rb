# frozen_string_literal: true

ActionMailer::Base.register_interceptor(Mailer::BouncedEmailInterceptor)

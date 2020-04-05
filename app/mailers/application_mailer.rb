class ApplicationMailer < ActionMailer::Base
  default from: ENV['notification_email']
  layout 'mailer'
end

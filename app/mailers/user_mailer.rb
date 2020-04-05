class UserMailer < ApplicationMailer
  default from: ENV['notification_email']

  def welcome_email
    @user = params[:user]
    @url  = url_for controller: 'auth', action: 'verify_email', token: @user.confirm_token, host: ENV['HOST_URL']
    mail(to: @user.email, subject: 'Welcome to Job Triage')
  end
end

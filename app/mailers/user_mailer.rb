class UserMailer < ApplicationMailer
  default from: ENV['notification_email']

  def welcome_email
    @user = params[:user]
    @url  = url_for controller: 'auth', action: 'verify_email', token: @user.confirm_token, host: ENV['HOST_URL']
    mail(to: @user.email, subject: 'Welcome to Job Triage')
  end

  def forgot_password_email
    @user = params[:user]
    mail(to: @user.email, subject: 'Reset OTP for Job Triage')
  end

  def deactivation_email
    @user = params[:user]
    mail(to: @user.email, subject: 'Account deactivation')
  end
end

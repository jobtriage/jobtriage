# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def welcome_email
    UserMailer.with(user: User.find_by(email: 'koushikmohan1996@gmail.com')).welcome_email
  end
end

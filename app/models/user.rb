require 'bcrypt'

class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include BCrypt

  before_create :generate_confirm_token
  after_create :send_welcome_email
  after_destroy :send_deactivation_email

  field :email, type: String
  field :name, type: String
  field :password_hash, type: String
  field :email_confirmed, type: Boolean, default: false
  field :confirm_token, type: String
  field :reset_token, type: String

  has_many :applications, dependent: :destroy
  has_many :analyses, dependent: :destroy
  has_one :pitch, dependent: :destroy

  validates :email, uniqueness: { message: 'Email already registered' }, presence: true
  validates :name, presence: true

  def self.build_user(params)
    user = User.new(name: params[:name], email: params[:email])
    user.password =  params[:password]
    user
  end

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def email_confirmed?
    return true unless ENV['USE_EMAIL_VERFICATION']
    self.email_confirmed
  end

  def generate_confirm_token
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end

  def generate_reset_token
    self.reset_token = SecureRandom.hex(4)
  end

  def send_welcome_email
    UserMailer.with(user: self).welcome_email.deliver_now
  end

  def send_forgot_password_email
    UserMailer.with(user: self).forgot_password_email.deliver_now
  end

  def send_deactivation_email
    UserMailer.with(user: self).deactivation_email.deliver_now
  end

end

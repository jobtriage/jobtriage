require 'bcrypt'

class User
  include Mongoid::Document
  include BCrypt

  before_create :generate_confirm_token

  field :email, type: String
  field :name, type: String
  field :password_hash, type: String
  field :email_confirmed, type: Boolean, default: false
  field :confirm_token, type: String
  field :reset_token, type: String

  has_many :applications
  has_many :analyses
  has_one :pitch

  validates :email, uniqueness: { message: 'Email already registered' }, presence: true
  validates :name, presence: true

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def as_json(*args)
    res = super
    res['_id'] = self.id.to_s
    res['password_hash'] = '****'
    res['confirm_token'] = '****'
    res['email_confirmed'] = true unless ENV['USE_EMAIL_VERIFICATION']
    res
  end

  def generate_confirm_token
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end

  def generate_reset_token
    self.reset_token = SecureRandom.hex(4)
  end
end

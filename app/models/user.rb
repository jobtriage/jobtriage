require 'bcrypt'

class User
  include Mongoid::Document
  include BCrypt

  field :email, type: String
  field :name, type: String
  field :password_hash, type: String

  validates :email, uniqueness: { message: 'Email already registered' }
  validates :name, presence: true

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end
end

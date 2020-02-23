ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Add more helper methods to be used by all tests here...
  def get_user(email)
    user = User.where(email: email).first
    if user
      return user
    else
      user = User.new
      user.email = 'test@test.com'
      user.name = 'test'
      user.password = 'test'
    end
    return user if user.save
  end

  def get_jwt_token(user_id)
    token = JsonWebToken.encode(user_id: user_id.to_s)
  end

  def add_application(user)
    user.applications.create(title: 'Dev', status: 'applied', priority: 3, company: { name: 'Job triage' })
  end
end

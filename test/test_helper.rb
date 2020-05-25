ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require "minitest/reporters"

Minitest::Reporters.use! [Minitest::Reporters::SpecReporter.new(:color => true)]

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Add more helper methods to be used by all tests here...
  def get_user
    if @user
      return @user
    else
      @user = User.where(email: 'test@test.com').first
      if !@user
        @user = User.new
        @user.email = 'test@test.com'
        @user.name = 'test'
        @user.password = 'test'
      end
    end
    return @user if @user.save!
  end

  def get_jwt_token(user_id)
    JsonWebToken.encode(user_id: user_id.to_s)
  end

  def add_application
    get_user.applications.create(title: 'Dev', status: 'applied', priority: 3, company: { name: 'Job triage' })
  end

  def delete_application(id)
    get_user.applications.find(id).delete
  end

  def add_notes(application, title, content)
    application.notes.create(title: title, content: content)
  end

  def get_request(url)
    get url, headers: { 'Authorization' => "bearer #{get_jwt_token(get_user.id)}" }
  end

  def delete_request(url)
    delete url, headers: { 'Authorization' => "bearer #{get_jwt_token(get_user.id)}" }
  end

  def post_request(url, data)
    post url, headers: { 
      'Authorization' => "bearer #{get_jwt_token(get_user.id)}" 
    },
    params: data
  end

  def put_request(url, data)
    put url, headers: { 
      'Authorization' => "bearer #{get_jwt_token(get_user.id)}" 
    },
    params: data
  end

  def assert_json_response
    assert_response :success
    json = JSON.parse @response.body, symbolize_names: true
    assert json, 'Response: ' + @response.body
    json
  end

  def assert_json_keys(json, *keys)
    keys.each { |key| assert json.key?(key), json.keys }
  end
end

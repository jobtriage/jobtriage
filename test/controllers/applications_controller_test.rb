# frozen_string_literal: true

require 'test_helper'

class ApplicationsControllerTest < ActionDispatch::IntegrationTest
  test 'Should get applications' do
    user = get_user('test@test.com')
    token = get_jwt_token(user.id)
    get applications_url, headers: { 'Authorization' => "bearer #{token}" }
    assert_response :success
  end

  test 'Should save job application' do
    user = get_user('test@test.com')
    token = get_jwt_token(user.id)
    post applications_url, headers: { 'Authorization' => "bearer #{token}" }, params: { 
      title: 'Software developer',
      status: 'Applied',
      priority: 3,
      company_name: 'Job triage'
    }
    assert_response :success
  end

  test 'Should update job details' do
    user = get_user('test@test.com')
    token = get_jwt_token(user.id)
    application = add_application(user)
    put application_url(application), headers: { 'Authorization' => "bearer #{token}" }, params: { 
      title: 'Software dev',
      status: 'applied',
      priority: 1,
      company_name: 'Job triage'
    }
    assert_response :success
  end

  test 'Should delete job details' do
    user = get_user('test@test.com')
    token = get_jwt_token(user.id)
    application = add_application(user)
    delete application_url(application), headers: { 'Authorization' => "bearer #{token}" }
    assert_response :success
  end

  test 'Should throw error if all parameters were not passed' do
    user = get_user('test@test.com')
    token = get_jwt_token(user.id)
    post applications_url, headers: { 'Authorization' => "bearer #{token}" }, params: { 
      status: 'applied',
      priority: 1,
      company_name: 'Job triage'
    }
    assert_response :internal_server_error
  end
end

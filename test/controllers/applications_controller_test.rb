# frozen_string_literal: true

require 'test_helper'

class ApplicationsControllerTest < ActionDispatch::IntegrationTest
  test 'Should get applications' do
    get_request applications_url
    assert_json_response
  end

  test 'should show job application details' do
    application = add_application
    get_request application_url(application)

    resp = assert_json_response
    assert_json_keys resp, :_id, :company, :description, :location, :status, :priority
  end

  test 'Should save job application' do
    post_request applications_url,
      title: 'Software developer',
      status: 'Applied',
      priority: 3,
      company_name: 'Job triage'

    resp = assert_json_response
    assert_json_keys resp, :_id, :company, :description, :location, :status, :priority
  end

  test 'Should update job details' do
    application = add_application
    put_request application_url(application),
      title: 'Software dev',
      status: 'applied',
      priority: 1,
      company_name: 'Job triage'

    resp = assert_json_response
    assert_json_keys resp, :_id, :company, :description, :location, :status, :priority
  end

  test 'Should delete job details' do
    application = add_application
    delete_request application_url(application)
    assert_response :success
  end

  test 'Should throw error if all parameters were not passed' do
    post_request applications_url,
      status: 'applied',
      priority: 1,
      company_name: 'Job triage'

    assert_response :internal_server_error
  end
end

# frozen_string_literal: true

require 'test_helper'

class ApplicationTest < ActiveSupport::TestCase
  test 'Application should not be saved without title' do
    user = get_user
    application = user.applications.new

    assert_not application.save, 'Application saved without title'
  end

  test 'Application should not be saved without status' do
    user = get_user
    application = user.applications.new
    application.title = 'Software develper'

    assert_not application.save, 'Application saved without status'
  end

  test 'Application should not be saved without priority' do
    user = get_user
    application = user.applications.new
    application.title = 'Software develper'
    application.status = 'applied'

    assert_not application.save, 'Application saved without priority'
  end

  test 'Application should not be saved without company' do
    user = get_user
    application = user.applications.new
    application.title = 'Software develper'
    application.status = 'applied'
    application.priority = 3

    assert_not application.save, 'Application saved without company'
  end

  test 'Application should be saved with proper data' do
    user = get_user
    application = user.applications.new
    application.title = 'Software develper'
    application.status = 'applied'
    application.priority = 3
    application.company = { name:'Job triage' }

    assert application.save, 'Application not saved with proper data'
  end
end

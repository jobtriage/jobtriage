# frozen_string_literal: true

require 'test_helper'
require 'minitest/autorun'

class UserTest < ActiveSupport::TestCase
  test 'User should not be saved without email id' do
    user = User.new
    assert_not user.save, 'Saved user without mail id'
  end

  test 'User should not be saved without name' do
    user = User.new
    user.email = 'test@test.com'
    assert_not user.save, 'Saved user without name'
  end

  test 'User should be saved for proper inputs' do
    user = User.new
    user.email = 'test1@test.com'
    user.name = 'test'

    assert user.save, 'User is not saved for proper data'
    user.delete
  end
end

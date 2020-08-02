Feature: update the account password
  As a user
  I want to update my account password
  So that I can log into my account using new password

  Background:
    Given the user with following details already exists:
      | name      | email               | password   |
      | test      | test@email.com      | testpass   |
    And the user has logged in with email "test@email.com" and password "testpass"
    And the user has browsed to the account page
  
  @blankPasswordUpdate
  Scenario Outline: update password with blank credentials
    When the user updates password with the following credentials using the webUI
      | currentPassword   | newPassword   | confirmPassword   |
      | <currentPassword> | <newPassword> | <confirmPassword> |
    Then the user should stay on the account page
    Examples:
      | currentPassword | newPassword | confirmPassword |
      |                 | newPassword | newPassword     |
      | password        |             | newPassword     |
      | password        | newpassword |                 |
  
  @invalidpassword
  Scenario: update password with invalid current credentials
    When the user updates password with the following credentials using the webUI
      | currentPassword | newPassword | confirmPassword |
      | password123     | newPassword | newPassword     |
    Then the user should be displayed a popup with message "Password mismatch"

  @unmatchPasswordUpdate
  Scenario: update password with unmatching new password
    When the user updates password with the following credentials using the webUI
      | currentPassword | newPassword | confirmPassword |
      | testpass        | newPassword | Password        |
    Then the password mismatch error message "Password and confirm password mismatch" should be displayed

  @validUpdate
  Scenario: update password with valid fields
    When the user updates password with the following credentials using the webUI
      | currentPassword | newPassword | confirmPassword |
      | testpass        | newPassword | newPassword     |
    Then the user should be displayed a popup with message "Password updated"
    And the user should be able to login with email "test@email.com" and password "newPassword"

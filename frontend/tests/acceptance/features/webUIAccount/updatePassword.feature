Feature: update the account password
  As a user
  I want to update my account password
  So that I can log into my account using new password

  Background:
    Given the user has signed up with name "user1", email "user1@gmail.com" password "password"
    And the user has logged in with email "user1@gmail.com" and password "password"
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

  @invalidCurrentPasswordUpdate
  Scenario: update password with invalid current credentials
    When the user updates password with the following credentials using the webUI
      | currentPassword | newPassword | confirmPassword |
      | password123     | newPassword | newPassword     |
    Then the user should be displayed a popup with message "Password mismatch"
    And the user must be able to login with email "user1@gmail.com" and password "password"

  @unmatchPasswordUpdate
  Scenario: update password with unmatching new password
    When the user updates password with the following credentials using the webUI
      | currentPassword | newPassword | confirmPassword |
      | password        | newPassword | Password        |
    Then a password mismatch error message "Password and confirm password mismatch" should be displayed
    And the user must be able to login with email "user1@gmail.com" and password "password"

  @validUpdate
  Scenario: update password with valid fields
    When the user updates password with the following credentials using the webUI
      | currentPassword | newPassword | confirmPassword |
      | password        | newPassword | newPassword     |
    Then the user should be displayed a popup with message "Password updated"
    And the user must be able to login with email "user1@gmail.com" and password "newPassword"

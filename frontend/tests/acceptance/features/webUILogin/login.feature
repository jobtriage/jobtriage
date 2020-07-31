Feature: login a user
  As a user
  I want to login to my dashboard
  So that I can access jobtriage services

  Background:
    Given the user with following details already exists:
      | name      | email               | password   |
      | test      | test@email.com      | testpass   |
    And the user has browsed to the login page using the webUI

  @validlogin
  Scenario: login a valid user
    When the user logs in with the following credentials using the webUI:
      | email           | password |
      | test@email.com  | testpass |
    Then the user should be redirected to the dashboard page

  @invalidlogin
  Scenario Outline: login with invalid credentials
    When the user logs in with the following credentials using the webUI:
      | email   | password   |
      | <email> | <password> |
    Then the login error message "Authentication failed check input" should be displayed
    Examples:
      | email          | password   |
      | user@email.com | testpass   |
      | test@email.com | mypassword |

  @emptyfields
  Scenario Outline: login with blank email
    When the user logs in with the following credentials using the webUI:
      | email   | password   |
      | <email> | <password> |
    Then the user should stay on the login page
    Examples:
      | email          | password   |
      |                |            |
      |                | testpass   |
      | test@email.com |            |

  @gotosignup
  Scenario: Go to signup page
    When the user clicks sign up here button
    Then the user should be redirected to the signup page
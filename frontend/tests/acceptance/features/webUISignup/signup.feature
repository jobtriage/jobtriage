Feature: Signup a user
  As a user
  I want to signup and create my account
  so that I can login to the application

  Background: browse to signup page
    Given the user has browsed to signup page

  @validsignup
  Scenario Outline: Signup a valid user
    When the user tries to sign up with name "<name>", valid email "<email>", password "<password>" and confirm password "<confirmPassword>"
    Then the user should be redirected to dashboard
    And the user should be able to login with email "<email>" and password "<password>"
    Examples:
      | name      | email               | password   | confirmPassword |
      | test      | test@email.com      | testpass   | testpass        |

  @emptyfields
  Scenario Outline: Signup with empty input fields
    When the user tries to sign up with name "<name>", email "<email>", password "<password>" and confirm password "<confirmPassword>"
    Then the user entered name "<name>", email "<email>", password "<password>" or confirm password "<confirmPassword>" should be preserved
    Examples:
      | name      | email               | password   | confirmPassword |
      |           |                     |            |                 |
      |           | test@email.com      | testpass   | testpass        |
      | test      |                     | testpass   | testpass        |
      | test      | test@email.com      |            | testpass        |
      | test      | test@email.com      | testpass   |                 |
    
  @invalidemail
  Scenario Outline: Signup with invalid email format
    When the user tries to sign up with name "<name>", email "<email>", password "<password>" and confirm password "<confirmPassword>"
    Then an invalid email message "Enter a valid email" should be displayed
    Examples:
      | name      | email          | password   | confirmPassword |
      | test      | user102.com    | testpass   | testpass        |
      | test      | user102@com    | testpass   | testpass        |
      | test      | user102@email. | testpass   | testpass        |
      | test      | .email         | testpass   | testpass        |
      | test      | @email.com     | testpass   | testpass        |

  @unmatchedpass
  Scenario: Signup user with unmatched password
    When the user tries to sign up with the following data:
      | name      | email               | password   | confirmPassword   |
      | test      | test@email.com      | testpass   | testpass2         |
    Then a password mis-match error message "Password and Confirm password is not same" should be displayed
  
  @registeredemail
  Scenario: Signup user with already registered email
    Given the user with name "test", email "test@email.com" and password "mypass" already exists
    When the user tries to sign up with the following data:
      | name      | email               | password   | confirmPassword   |
      | newuser   | test@email.com      | testpass   | testpass          |
    Then an already registered error message "Error occurred check inputs" should be displayed

  @gotologin
  Scenario: Go to login page
    When the user tries to go to login page
    Then the user should be redirected to login page
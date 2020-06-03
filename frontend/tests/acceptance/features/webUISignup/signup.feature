Feature: Signup a user
  As a user
  I want to signup and create my account
  So that I can log in to the application

  Background: browse to signup page
    Given the user has browsed to signup page

  @validsignup
  Scenario Outline: Signup a valid user
    When the user signs up with the following data using the webUI:
      | name      | email        | password     |
      | <name>    | <email>      | <password>   |
    Then the user should be redirected to dashboard
    And the user should be able to login with email "<email>" and password "<password>"
    Examples:
      | name      | email             | password   |
      | test      | test@email.com    | testpass   |

  @emptyfields
  Scenario Outline: Signup with empty input fields
    When the user signs up with the following data using the webUI:
      | name      | email      | password   | confirmPassword    |
      | <name>    | <email>    | <password> | <confirmPassword>  |
    Then the input fields should have following values:
      | name      | email      | password   | confirmPassword    |
      | <name>    | <email>    | <password> | <confirmPassword>  |
    And the user should not be created
    Examples:
      | name      | email               | password   | confirmPassword |
      |           |                     |            |                 |
      |           | test@email.com      | testpass   | testpass        |
      | test      |                     | testpass   | testpass        |
      | test      | test@email.com      |            | testpass        |
      | test      | test@email.com      | testpass   |                 |
    
  @invalidemail
  Scenario Outline: Signup with invalid email format
    When the user signs up with the following data using the webUI:
      | name      | email          | password       |
      | <name>    | <email>        | <password>     |
    Then an error message "Enter a valid email" should be displayed
    Examples:
      | name      | email          | password   |
      | test      | user102.com    | testpass   |
      | test      | user102@com    | testpass   |
      | test      | user102@email. | testpass   |
      | test      | .email         | testpass   |
      | test      | @email.com     | testpass   |

  @unmatchedpass
  Scenario: Signup user with unmatched password
    When the user signs up with the following data using the webUI:
      | name      | email               | password   | confirmPassword   |
      | test      | test@email.com      | testpass   | testpass2         |
    Then an error message "Password and Confirm password is not same" should be displayed
  
  @registeredemail
  Scenario: Signup user with already registered email
    Given the user with following details already exists:
      | name      | email               | password   |
      | test      | test@email.com      | mypass     |
    When the user signs up with the following data using the webUI:
      | name      | email               | password   |
      | newuser   | test@email.com      | testpass   |
    Then an error message "Error occurred check inputs" should be displayed

  @gotologin
  Scenario: Go to login page
    When the user clicks go to login page button
    Then the user should be redirected to login page
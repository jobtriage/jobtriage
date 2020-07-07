Feature: Add a new job application
  As a user
  I want to add new job application
  So that I can keep record and manage my job applications

  Background: User has access to dashboard
    Given a user has been registered with the following details:
      | name | email          | password |
      | test | test@email.com | testpass |
    And the user has logged in with email "test@email.com" and password "testpass"
    And the user has opened add new job application dialog form from the dashboard

  @addnewjob
  Scenario Outline: Add a new job application
    When the user adds a new job application with the following data:
      | title   | company   | priority   | status   | location        |
      | <title> | <company> | <priority> | <status> | Omaha, Nebraska |
    Then a success message "Job Application added successfully" should pop up
    And the job application of title "<title>" should be added in "<status>" status board in the dashboard
    Examples:
      | title          | company     | priority | status       |
      | Office Manager | ABC Company | Medium   | Yet to Apply |
      | Web Developer  | XYZ Company | Low      | Applied      |
      | Web Designer   | PQR Company | Medium   | In Progress  |
      | Sales Officer  | YXZ Company | High     | Accepted     |
      | Designer       | AAA Company | Low      | Rejected     |
     
  @unselectedoptions
  Scenario Outline: Add new job application with unselected options
    When the user adds a new job application with the following data:
      | title          | company     | priority   | status   | location        |
      | Office Manager | ABC Company | <priority> | <status> | Omaha, Nebraska |
    Then an error message "Error in adding Job Application" should pop up
    Examples:
      | priority | status       |
      |          |              |
      |          | In Progress  |
      | Low      |              |
      
  @canceladd
  Scenario: Cancel adding new job application
    When the user cancels adding a new job application
    Then the add new job application dialog form should be closed
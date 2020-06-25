Feature: Organize job applications
  As a user
  I want to organize my job applications
  So that I can update the status of my applications

  Background: User has access to dashboard
    Given a user has been registered with the following details:
      | name | email          | password |
      | test | test@email.com | testpass |
    And the user has logged in to the dashboard with email "test@email.com" and password "testpass" using the webUI

  @movejobs
  Scenario Outline: Move job application from one status heading to another status heading
		Given the following job application already exists:
      | title   | company   | priority   | status          |
      | <title> | <company> | <priority> | <initialStatus> |
    When the user moves job application from "<initialStatus>" to "<dragTOStatus>" status board
    Then the job application of title "<title>" should be moved from "<initialStatus>" status board
    And the job application of title "<title>" should be added in "<dragTOStatus>" status board in the dashboard
    Examples:
      | title          | company     | priority | initialStatus | dragTOStatus  |
      | Office Manager | ABC Company | Medium   | Yet to Apply  | Applied       |
      | Office Manager | ABC Company | Medium   | Applied       | In Progress   |
      | Office Manager | ABC Company | Medium   | In Progress   | Accepted      |
      | Office Manager | ABC Company | Medium   | Accepted      | Rejected      |
      | Office Manager | ABC Company | Medium   | Rejected      | Yet to Apply  |

  @movewithin
  Scenario Outline: Move job application within a status board
		Given the following job application already exists:
      | title          | company     | priority   | status   |
      | Office Manager | ABC Company | Medium     | <status> |
      | Sales Manager  | XYZ Company | Low        | <status> |
    When the user moves second job application above the first job application within "<status>" status board
    Then the second job applications should appear above the first job application within "<status>" status board
    Examples:
      | status       |
      | Yet to Apply |
      | Applied      |
      | In Progress  |
      | Accepted     |
      | Rejected     |
    
  @deletejob
  Scenario Outline: Delete job application from dashboard
		Given the following job application already exists:
      | title   | company   | priority   | status   |
      | <title> | <company> | <priority> | <status> |
    When the user deletes job application of "<status>" status board using webUI
    Then the job application of title "<title>" should not appear in "<status>" status board
    Examples:
      | title          | company     | priority | status       |
      | Office Manager | ABC Company | Medium   | Yet to Apply |
      | Office Manager | ABC Company | Medium   | Applied      |
      | Office Manager | ABC Company | Medium   | In Progress  |
      | Office Manager | ABC Company | Medium   | Accepted     |
      | Office Manager | ABC Company | Medium   | Rejected     |
  
  @gotoupdatejob
  Scenario Outline: Go to update job application page from dashboard
		Given the following job application already exists:
      | title   | company   | priority   | status   |
      | <title> | <company> | <priority> | <status> |
    When the user clicks job application of title "<title>" from "<status>" status board
    Then the user should be redirected to update job application page and should see following data:
      | title   | company   | priority   | status   |
      | <title> | <company> | <priority> | <status> |
    Examples:
      | title          | company     | priority | status       |
      | Office Manager | ABC Company | Medium   | Yet to Apply |
      | Office Manager | ABC Company | Medium   | Applied      |
      | Office Manager | ABC Company | Medium   | In Progress  |
      | Office Manager | ABC Company | Medium   | Accepted     |
      | Office Manager | ABC Company | Medium   | Rejected     |
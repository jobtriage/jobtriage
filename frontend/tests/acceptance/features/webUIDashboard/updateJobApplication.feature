Feature: Update job application
  As a user
  I want to update my job applications
  So that I can make corrections to my job applications

  Background: User has access to dashboard
    Given a user has been registered with the following details:
      | name | email          | password |
      | test | test@email.com | testpass |
    And the user has logged in with email "test@email.com" and password "testpass"
    And the following job application has been created:
      | title          | company     | priority | status       |
      | Office Manager | ABC Company | Medium   | Yet to Apply |
    And the use has navigated to the dashboard
    And the user has navigated to update job application page to update the job application of title "Office Manager" using the webUI

  @updatewithemptytitle
  Scenario: Update job application with empty job title
  When the user updates the job application with empty job title
  Then an update error message "Update failed" should pop up
  And the initial job title "Office Manager" should be preserved

  @updatejob
  Scenario Outline: Update job application
  When the user updates the job application with following details:
    | title   | priority   | status   | company   | company_link   | job_url   | description   |
    | <title> | <priority> | <status> | <company> | <company_link> | <job_url> | <description> |
  Then an update success message "Update success" should pop up
  And the job application of title "<title>" having company name "<company>" and priority "<priority>" should appear under "<status>" status board in the dashboard
  And the following updated details should appear in the update job application page:
    | title   | priority   | status   | company   | company_link   | job_url   | description   |
    | <title> | <priority> | <status> | <company> | <company_link> | <job_url> | <description> |
  Examples:
    | title         | priority | status  | company     | company_link    | job_url                 | description                |
    | Sales Manager | Low      | Applied | XYZ Company | http://xyz.com/ | http://xyz.com/jobpost/ | Some description about job |

  @navigatetabs
  Scenario: Navigate from details to the notes tab
  When the user clicks notes tab
  Then the notes page should be displayed

  @navigatetabs
  Scenario: Navigate from notes to the details tab
  Given the user is in the notes page
  When the user clicks details tab
  Then the details page should be displayed
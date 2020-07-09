Feature: Add time log to job application
  As a user
  I want to add time log to my job applications
  So that I can keep track of my job applications

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

  @addtimelog
  Scenario Outline: Add new time log
  When the user adds a new time log with following details:
    | type   | day   | month   | year   | hour   | minute   | period   | note   |
    | <type> | <day> | <month> | <year> | <hour> | <minute> | <period> | <note> |
  Then the new time log should be displayed with following details:
    | type   | note   |
    | <type> | <note> |
  Examples:
    | type      | day | month  | year | hour | minute | period | note               |
    | Interview | 4   | August | 2020 | 10   | 30     | AM     | General discussion |

  @updatetimelog
  Scenario Outline: Update time log
  Given the following time log has been created:
    | type      | day | month  | year | hour | minute | period | note               |
    | Interview | 2   | August | 2020 | 10   | 30     | AM     | General discussion |
  When the user updates the time log of type "Interview" with following details:
    | type   | day   | month   | year   | hour   | minute   | period   | note   |
    | <type> | <day> | <month> | <year> | <hour> | <minute> | <period> | <note> |
  Then the time log should be updated with new type "<type>" and new note "<note>"
  Examples:
    | type     | day | month  | year | hour | minute | period | note           |
    | Rejected | 5   | August | 2020 | 5    | 30     | PM     | Job post taken |

  @deletetimelog
  Scenario: Delete time log
  Given the following time log has been created:
    | type      | day | month  | year | hour | minute | period | note               |
    | Interview | 2   | August | 2020 | 10   | 30     | PM     | General discussion |
  When the user deletes time log of type "Interview" using the webUI
  Then the time log of type "Interview" should not exist

  @addtocalender
  Scenario: Add time log to google calender
  Given the following time log has been created:
    | type      | day | month  | year | hour | minute | period | note               |
    | Interview | 2   | August | 2020 | 10   | 30     | PM     | General discussion |
  When the user clicks add to calender button of time log having type "Interview" using the webUI
  Then the user should be redirected to google calender
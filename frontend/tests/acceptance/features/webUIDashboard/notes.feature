Feature: Add notes to job application
  As a user
  I want to add notes to my job applications
  So that I can remark my job applications

  Background: Valid user has access to the dashboard
    Given a user has been registered with the following details:
      | name | email          | password |
      | test | test@email.com | testpass |
    And the user has logged in with email "test@email.com" and password "testpass"
    And the following job application has been created:
      | title          | company     | priority | status       |
      | Office Manager | ABC Company | Medium   | Yet to Apply |
    And the use has navigated to the dashboard
    And the user has navigated to update job application page to update the job application of title "Office Manager" using the webUI

  @addnewnote
  Scenario Outline: Add new job note
  Given the user is in the notes page
  When the user adds a new note with following details:
    | title   | content   |
    | <title> | <content> |
  Then the newly created note of title "<title>" and content "<content>" should appear
  Examples:
    | title     | content            |
    | TestTitle | Some contents here |

  @updatenote
  Scenario Outline: Update job note
  Given the following job has been created:
    | title     | content            |
    | TestTitle | Some contents here |
  And the user is in the notes page
  When the user updates the job note of title "TestTitle" with following details:
    | title   | content   |
    | <title> | <content> |
  Then the note should be updated with new title "<title>" and new content "<content>"
  Examples:
    | title    | content                |
    | NewTitle | More new contents here |

  @deletenote
  Scenario: Delete job note
  Given the following job has been created:
    | title     | content            |
    | TestTitle | Some contents here |
  And the user is in the notes page
  When the user deletes job note of title "TestTitle" using the webUI
  Then the job note of title "TestTitle" should not exist
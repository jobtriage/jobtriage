Feature: navigation
  As a user
  I want to navigate to different pages
  So that I can access the functionality provided by the pages

  Background:
    Given the user with following details already exists:
      | name      | email               | password   |
      | test      | test@email.com      | testpass   |
    And the user has logged in with email "test@email.com" and password "testpass"
    And the user has browsed to the dashboard page

  @dashboardNavigation
  Scenario: navigate to dashboard page
    Given the user is in the Account page
    When the user clicks the dashboard option from the sidebar menu using the webUI
    Then the user should be redirected to the dashboard page

  @selfAnalysisNavigation
  Scenario: navigate to self analysis page
    When the user clicks the Self Analysis option from the sidebar menu using the webUI
    Then the user should be redirected to the self analysis page

  @accountNavigation
  Scenario: navigate to account page
    When the user clicks the account option from the sidebar menu using the webUI
    Then the user should be redirected to the account page

  @logout
  Scenario: logout
    When the user clicks the logout option from the sidebar menu using the webUI
    Then the user should be redirected to the login page
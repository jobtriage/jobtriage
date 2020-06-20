Feature: navigation
  As a user
  I want to navigate to different pages
  So that I can access the functionality provided by the pages

  Background:
    Given the user has signed up with name "user1", email "user1@gmail.com" password "password"
    And the user has logged in with email "user1@gmail.com" and password "password"
    And the user has browsed to the dashboard page

  @dashboardNavigation
  Scenario: navigate to dashboard page
    When the user clicks on dashboard option on the drawer using the webUI
    Then the user should be redirected to the dashboard page

  @selfAnalysisNavigation
  Scenario: navigate to self analysis page
    When the user clicks on Self Analysis option on the drawer using the webUI
    Then the user should be redirected to the self analysis page

  @accountNavigation
  Scenario: navigate to account page
    When the user clicks on account option on the drawer using the webUI
    Then the user should be redirected to account page

  @logout
  Scenario: logout
    When the user clicks on logout option on the drawer using the webUI
    Then the user should be redirected to login page
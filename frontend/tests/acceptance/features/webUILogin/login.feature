Feature: login a user
  As a user
  I want to login to my dashboard

  Scenario: login a user
    Given the user has signed up with name "user1", email "user1@gmail.com" password "password"
    When the user browses to the login page
    And the user logs in with email "user1@gmail.com" and password "password" using the webUI
    Then user should be redirected to the dashboard page

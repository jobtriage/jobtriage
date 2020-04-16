Feature: login a user
  As a user
  I want to login to my dashboard

  Scenario: signup and login a user
    Given the user has browsed to the homepage
    When the user browses to the signup page using the webUI
    And the user signs up with name "user2", email "user2@gmail.com" and password "hari" using the webUI
    And the user browses to the login page
    And the user logs in with email "user2@gmail.com" and password "hari" using the webUI
    Then user should be redirected to the dashboard page

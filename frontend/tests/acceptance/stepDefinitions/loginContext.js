const { Given, When, Then } = require('cucumber');
const { client } = require('nightwatch-api');

Given('the user has browsed to the homepage', () => client.page.homepage().navigate());

When('the user browses to login page page using the webUI', () => {
  return client.page.homepage().navigateToLoginPage().navigate();
});

When('the user browses to the signup page using the webUI', () => {
  return client.page.homepage().navigateToSignUpPage();
});

When('the user signs up with name {string}, email {string} and password {string} using the webUI', (name, email, password) => {
  return client.page.signupPage().signUpWithDetails(name, email, password);
});

When('the user browses to the login page', () => client.page.loginPage().navigate());


When('the user logs in with email {string} and password {string} using the webUI', (email, password) => {
  return client.page.loginPage().loginWithDetails(email, password);
});

Then('user should be redirected to the dashboard page', () => {
  return client.page.dashboardPage().assertDashboardIsDisplayed();
});

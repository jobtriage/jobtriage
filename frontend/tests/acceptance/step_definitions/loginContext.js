const { I } = inject();
const loginPage = require('../pages/loginPage');
const dashboard = require('../pages/dashboardPage');
const signupPage = require('../pages/signupPage');

Given('the user has browsed to the homepage', () => I.amOnPage('/'));

When('the user signs up with name {string}, email {string} password {string} and confirmation password {string} using the webUI',
  (name, email, password, confirmationPassword) => {
    signupPage.signUp(name, email, password, confirmationPassword);
  });

When('the user browses to the login page', () => I.amOnPage(loginPage.url));

When('the user logs in with email {string} and password {string} using the webUI', (email, password) => {
  loginPage.login(email, password);
});

Then('user should be redirected to the dashboard page', () => I.seeElement(dashboard.dashboardContainer));

const { I } = inject();
const loginPage = require('../pages/loginPage');
const signupPage = require('../pages/signupPage');
const { elementWaitTime } = require('../helpers/globals');
const { registerUser } = require('../helpers/api/user');

const ELEMENTS = loginPage.elements;

Given('the user with following details already exists:', async (table) => {
  const user = table.parse().hashes()[0];
  await registerUser(user);
});

Given('the user has browsed to the login page using the webUI', () => {
  I.amOnPage(loginPage.url);
});

When('the user logs in with the following credentials using the webUI:', async (table) => {
  const data = table.parse().hashes()[0];
  await loginPage.login(data);
});

When('the user clicks sign up here button', () => {
  loginPage.navigateToSignup();
});

Then('the login error message {string} should be displayed', (message) => {
  I.waitForElement(ELEMENTS.error_label, elementWaitTime);
  I.see(message, ELEMENTS.error_label);
});

Then('the user should stay on the login page', () => {
  loginPage.amOnThisPage();
});

Then('the user should be redirected to the signup page', () => {
  signupPage.amOnThisPage();
});

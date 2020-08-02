const { I } = inject();
const signupPage = require('../pages/signupPage');
const loginPage = require('../pages/loginPage');
const dashboardPage = require('../pages/dashboardPage');
const { users } = require('../helpers/globals');
const { deleteUser, loginUser } = require('../helpers/api/user');
const { elementWaitTime } = require('../helpers/globals');

const ELEMENTS = signupPage.elements;
const FIELDS = signupPage.fields;

Given('the user has browsed to the signup page using the webUI', async () => {
  await I.amOnPage(signupPage.url);
});

When('the user signs up with the following data using the webUI:', async (table) => {
  const data = table.parse().hashes()[0];
  await signupPage.signUp(data);
});

When('the user clicks login here button', async () => {
  await signupPage.navigateToLogin();
});

Then('the user should be redirected to the login page', async () => {
  await loginPage.amOnThisPage();
});

Then('the user should be redirected to the dashboard page', async () => {
  await dashboardPage.amOnThisPage();
});

Then('the user should be able to login with email {string} and password {string}', async (email, password) => {
  users.length = 0;
  users.push({ email, password });
  await loginUser(email, password);
});

Then('the input fields should have following values:', async (table) => {
  const { name, email, password, confirmPassword } = table.parse().hashes()[0];

  await I.seeInField(FIELDS.name, name);
  await I.seeInField(FIELDS.email, email);
  await I.seeInField(FIELDS.password, password);
  await I.seeInField(FIELDS.confirmPassword, confirmPassword);
});

Then('the user should not be created', async () => {
  await signupPage.amOnThisPage();
  await I.dontSee(ELEMENTS.error_label);
});

Then('the signup error message {string} should be displayed', async (message) => {
  I.waitForElement(ELEMENTS.error_label, elementWaitTime);
  await I.see(message, ELEMENTS.error_label);
});

After(async () => {
  await deleteUser();
});

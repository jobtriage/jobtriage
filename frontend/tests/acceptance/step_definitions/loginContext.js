const { I } = inject();
const loginPage = require('../pages/loginPage');
const dashboard = require('../pages/dashboardPage');
const userAPI = require('../helpers/api/user');

Given('the user has signed up with name {string}, email {string} password {string}', async (name, email, password) => {
  await userAPI.register(name, email, password);
});

Given('the user has browsed to the homepage', () => I.amOnPage('/'));

When('the user logs in with email {string} and password {string} using the webUI', (email, password) => {
  loginPage.login(email, password);
});

Then('the user should be redirected to the dashboard page', () => I.seeElement(dashboard.dashboardContainer));

Given('the user has browsed to the login page using the webUI', () => {
  I.amOnPage(loginPage.url);
});

When('the user logs in with the following credentials using the webUI:', (table) => {
  let usersTable = table.parse().hashes();
  email = usersTable[0].email;
  password = usersTable[0].password;
  loginPage.login(email, password);
});

Then('an error message {string} should be displayed', (message) => {
  I.seeElement(loginPage.text.error);
  I.see(message, loginPage.text.error);
});

Then('the user should stay on the login page', () => {
  loginPage.amOnThisPage();
});

const { I } = inject();
const loginPage = require('../pages/loginPage');
const dashboard = require('../pages/dashboardPage');
const axios = require('axios');

const apiUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

Given('the user has signed up with name {string}, email {string} password {string}', (name, email, password) => {
  axios.post(`${apiUrl}/auth/register`, { name, email, password });
});

When('the user browses to the login page', () => I.amOnPage(loginPage.url));

When('the user logs in with email {string} and password {string} using the webUI', (email, password) => {
  loginPage.login(email, password);
});

Then('user should be redirected to the dashboard page', () => I.seeElement(dashboard.dashboardContainer));

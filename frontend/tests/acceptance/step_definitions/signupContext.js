const { I } = inject();
const axios = require('axios');
const signupPage = require('../pages/signupPage');

const apiUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

Given('the user has signed up with name {string}, email {string} password {string}', (name, email, password) => {
  axios.post(`${apiUrl}/auth/register`, { name, email, password });
});

When('the user browses to the signup page using the webUI', () => I.amOnPage(signupPage.url));

Then('the user should be able to login with email {string} and password {string}', async (email, password) => {
  try {
    await axios.post(`${apiUrl}/auth/login`, { email, password });
  } catch (error) {
    throw new Error(`Cannot login user with email ${email}
     Status code: ${error.response.status}
     Stauts: ${error.response.statusText}`);
  }
});

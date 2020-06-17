const { I } = inject();
const axios = require('axios');
const signupPage = require('../pages/signupPage');

const apiUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

Given('the user has browsed to the homepage', () => I.amOnPage('/'));

When('the user browses to the signup page using the webUI', () => I.amOnPage(signupPage.url));

When(
  'the user signs up with name {string}, email {string} password {string} and confirmation password {string} using the webUI',
  async (name, email, password, confirmationPassword) => {
    await signupPage.signUp(name, email, password, confirmationPassword);
  }
);

Then('the user should be able to login with email {string} and password {string}', async (email, password) => {
  try {
    await axios.post(`${apiUrl}/auth/login`, { email, password });
  } catch (error) {
    console.log(error);
    throw new Error(`Cannot login user with email ${email}
     Status code: ${error.response.status}
     Stauts: ${error.response.statusText}`);
  }
});

const { I } = inject();
const { elementWaitTime } = require('../helpers/globals');

module.exports = {
  url: '/login',
  fields: {
    email: '//label[contains(text(),"Email")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    password: '//label[contains(text(),"Password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
  },

  elements: {
    login_button: '//button/span[contains(text(),"Login")]',
    error_label: '//form/p[contains(text(),"Authentication failed check input")]',
    signup_label: '//form//span[contains(.,"Sign up here")]',
  },

  async login(user) {
    const { email, password } = user;

    this.fillEmail(email);
    this.fillPassword(password);

    I.waitForElement(this.elements.login_button, elementWaitTime);
    await I.click(this.elements.login_button);
  },

  fillEmail(email) {
    I.waitForElement(this.fields.email, elementWaitTime);
    I.fillField(this.fields.email, email);
  },

  fillPassword(password) {
    I.waitForElement(this.fields.password, elementWaitTime);
    I.fillField(this.fields.password, password);
  },

  navigateToSignup() {
    I.waitForElement(this.elements.signup_label, elementWaitTime);
    I.click(this.elements.signup_label);
  },

  amOnThisPage() {
    I.waitForElement(this.elements.login_button, elementWaitTime);
    I.seeElement(this.elements.login_button);
  },
};

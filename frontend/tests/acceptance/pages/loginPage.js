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

    await this.fillEmail(email);
    await this.fillPassword(password);

    I.waitForElement(this.elements.login_button, elementWaitTime);
    await I.click(this.elements.login_button);
  },

  async fillEmail(email) {
    I.waitForElement(this.fields.email, elementWaitTime);
    await I.fillField(this.fields.email, email);
  },

  async fillPassword(password) {
    I.waitForElement(this.fields.password, elementWaitTime);
    await I.fillField(this.fields.password, password);
  },

  async navigateToSignup() {
    I.waitForElement(this.elements.signup_label, elementWaitTime);
    await I.click(this.elements.signup_label);
  },

  async amOnThisPage() {
    I.waitForElement(this.elements.login_button, elementWaitTime);
    await I.seeElement(this.elements.login_button);
  },
};

const { I } = inject();
const { elementWaitTime } = require('../helpers/globals');

module.exports = {
  url: '/signup',
  fields: {
    name: '//label[contains(text(),"Name")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    email: '//label[contains(text(),"Email")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    password: '//label[contains(text(),"Password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    confirmPassword:
      '//label[contains(text(),"Confirm password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
  },

  elements: {
    error_label: '//form/p[contains(@class,"makeStyles-error-")]',
    login_label: '//form//span[contains(.,"Login here")]',
    signup_button: '//button/span[contains(text(),"Sign Up")]',
  },

  async signUp(user) {
    const { name, email, password } = user;
    const confirmPassword = user.hasOwnProperty('confirmPassword') ? user.confirmPassword : password;

    this.fillname(name);
    this.fillEmail(email);
    this.fillPassword(password);
    this.fillConfirmPassword(confirmPassword);

    I.waitForElement(this.elements.signup_button, elementWaitTime);
    await I.click(this.elements.signup_button);
  },

  fillname(name) {
    I.waitForElement(this.fields.name, elementWaitTime);
    I.fillField(this.fields.name, name);
  },

  fillEmail(email) {
    I.waitForElement(this.fields.email, elementWaitTime);
    I.fillField(this.fields.email, email);
  },

  fillPassword(password) {
    I.waitForElement(this.fields.password, elementWaitTime);
    I.fillField(this.fields.password, password);
  },

  fillConfirmPassword(confirmPassword) {
    I.waitForElement(this.fields.confirmPassword, elementWaitTime);
    I.fillField(this.fields.confirmPassword, confirmPassword);
  },

  navigateToLogin() {
    I.waitForElement(this.elements.login_label, elementWaitTime);
    I.click(this.elements.login_label);
  },

  amOnThisPage() {
    I.waitForElement(this.elements.signup_button, elementWaitTime);
    I.seeElement(this.elements.signup_button);
  },
};

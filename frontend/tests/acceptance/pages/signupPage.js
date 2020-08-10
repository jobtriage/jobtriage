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

  /**
   *
   * @param {object} user
   */
  async signUp(user) {
    const { name, email, password } = user;
    const confirmPassword = user.hasOwnProperty('confirmPassword') ? user.confirmPassword : password;

    await this.fillname(name);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(confirmPassword);

    I.waitForElement(this.elements.signup_button, elementWaitTime);
    await I.click(this.elements.signup_button);
  },

  /**
   *
   * @param {string} name
   */
  async fillname(name) {
    I.waitForElement(this.fields.name, elementWaitTime);
    await I.fillField(this.fields.name, name);
  },

  /**
   *
   * @param {string} email
   */
  async fillEmail(email) {
    I.waitForElement(this.fields.email, elementWaitTime);
    await I.fillField(this.fields.email, email);
  },

  /**
   *
   * @param {string} password
   */
  async fillPassword(password) {
    I.waitForElement(this.fields.password, elementWaitTime);
    await I.fillField(this.fields.password, password);
  },

  /**
   *
   * @param {string} confirmPassword
   */
  async fillConfirmPassword(confirmPassword) {
    I.waitForElement(this.fields.confirmPassword, elementWaitTime);
    await I.fillField(this.fields.confirmPassword, confirmPassword);
  },

  async navigateToLogin() {
    I.waitForElement(this.elements.login_label, elementWaitTime);
    await I.click(this.elements.login_label);
  },

  async amOnThisPage() {
    I.waitForElement(this.elements.signup_button, elementWaitTime);
    await I.seeElement(this.elements.signup_button);
  },
};

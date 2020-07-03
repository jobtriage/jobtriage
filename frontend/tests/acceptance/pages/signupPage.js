const { I } = inject();

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
    signup_button: '//form/button/span[contains(.,"Sign Up")]',
  },
  async signUp(name, email, password, confirmPassword) {
    this.fillname(name);
    this.fillEmail(email);
    this.fillPassword(password);
    this.fillConfirmPassword(confirmPassword);
    await this.clickSignUp();
  },
  fillname(name) {
    I.waitForElement(this.fields.name, 5);
    I.fillField(this.fields.name, name);
  },
  fillEmail(email) {
    I.waitForElement(this.fields.email, 5);
    I.fillField(this.fields.email, email);
  },
  fillPassword(password) {
    I.waitForElement(this.fields.password, 5);
    I.fillField(this.fields.password, password);
  },
  fillConfirmPassword(confirmPassword) {
    I.waitForElement(this.fields.confirmPassword), 5;
    I.fillField(this.fields.confirmPassword, confirmPassword);
  },
  async clickSignUp() {
    I.waitForElement(this.elements.signup_button, 5);
    await I.click(this.elements.signup_button);
  },
  goToLogin() {
    I.waitForElement(this.elements.login_label, 5);
    I.click(this.elements.login_label);
  },
};

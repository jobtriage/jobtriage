const { I } = inject();

module.exports = {
  url: "/signup",
  fields: {
    name: '//label[contains(text(),"Name")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    email: '//label[contains(text(),"Email")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    password: '//label[contains(text(),"Password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    confirmPassword: '//label[contains(text(),"Confirm password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
  },
  elements: {
    error_lbl: '//form/p[@class="makeStyles-error-5"]',
    login_lbl: '//form/p/span[contains(@class,"makeStyles-span-7")]',
    signup_btn: '//form/button/span[contains(.,"Sign Up")]',
  },
  async signUp(name, email, password, confirmPassword) {
    await I.waitForElement(this.fields.name);
    await I.fillField(this.fields.name, name);
    await I.waitForElement(this.fields.email);
    await I.fillField(this.fields.email, email);
    await I.waitForElement(this.fields.password);
    await I.fillField(this.fields.password, password);
    await I.waitForElement(this.fields.confirmPassword);
    await I.fillField(this.fields.confirmPassword, confirmPassword);
    await I.waitForElement(this.elements.signup_btn);
    await I.click(this.elements.signup_btn);
  },
  tryInvalidSignup(name, email, password, confirmPassword) {
    this.fillname(name);
    this.fillEmail(email);
    this.fillPassword(password);
    this.fillConfirmPassword(confirmPassword);
    this.clickSignUp();
  },
  fillname(name) {
    I.waitForElement(this.fields.name);
    I.fillField(this.fields.name, name);
  },
  fillEmail(email) {
    I.waitForElement(this.fields.email);
    I.fillField(this.fields.email, email);
  },
  fillPassword(password) {
    I.waitForElement(this.fields.password);
    I.fillField(this.fields.password, password);
  },
  fillConfirmPassword(confirmPassword) {
    I.waitForElement(this.fields.confirmPassword);
    I.fillField(this.fields.confirmPassword, confirmPassword);
  },
  clickSignUp() {
    I.waitForElement(this.elements.signup_btn);
    I.click(this.elements.signup_btn);
  },
  goToLogin() {
    I.waitForElement(this.elements.login_lbl);
    I.click(this.elements.login_lbl);
  },
};

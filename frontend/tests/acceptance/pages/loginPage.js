const { I } = inject();

module.exports = {
  url: '/login',
  fields: {
    email: '//label[contains(text(),"Email")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    password: '//label[contains(text(),"Password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
  },
  buttons: {
    login: "//button/span[contains(text(),'Login')]",
  },
  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLogin();
  },
  text: {
    error: '//form/p[contains(text(),"Authentication failed check input")]',
  },
  fillEmail(email) {
    I.waitForVisible(this.fields.email, 5);
    I.fillField(this.fields.email, email);
  },
  fillPassword(password) {
    I.waitForVisible(this.fields.password, 5);
    I.fillField(this.fields.password, password);
  },
  clickLogin() {
    I.click(this.buttons.login);
  },
  amOnThisPage() {
    I.seeElement(this.buttons.login);
  },
};

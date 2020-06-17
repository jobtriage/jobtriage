const { I } = inject();

module.exports = {
  url: "/login",
  fields: {
    email: '//label[contains(text(),"email")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
    password: '//label[contains(text(),"password")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
  },
  buttons: {
    login: '//button/span[contains(text(),"Login")]',
  },
  login(email, password) {
    I.waitForVisible(this.fields.email);
    I.fillField(this.fields.email, email);
    I.fillField(this.fields.password, password);
    I.click("Login");
  },
};

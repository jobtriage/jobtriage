const { I } = inject();

module.exports = {
  url: '/signup',
  fields: {
    name: '//label[contains(text(),"Name")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
    email: '//label[contains(text(),"Email")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
    password: '//label[contains(text(),"Password")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
    confirmPassword:
      '//label[contains(text(),"Confirm password")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
  },
  async signUp(name, email, password, confirmPassword) {
    I.waitForVisible(this.fields.name);
    I.fillField(this.fields.name, name);
    I.fillField(this.fields.email, email);
    I.fillField(this.fields.password, password);
    I.fillField(this.fields.confirmPassword, confirmPassword);
    await I.click('Sign Up');
  },
};

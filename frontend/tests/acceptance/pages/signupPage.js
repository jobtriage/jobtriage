const { I } = inject();

module.exports = {
  url: '/signup',
  fields: {
    name: '//label[contains(text(),"name")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
    email: '//label[contains(text(),"email")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
    password: '//label[contains(text(),"password")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
    confirmPassword: '//label[contains(text(),"confirm password")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
  },
  signUp(name, email, password, confirmPassword) {
    I.waitForVisible(this.fields.name);
    I.fillField(this.fields.name, name);
    I.fillField(this.fields.email, email);
    I.fillField(this.fields.password, password);
    I.fillField(this.fields.confirmPassword, confirmPassword);
    I.click('Sign Up');
  },
};

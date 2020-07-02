const { I } = inject();

module.exports = {
  url: '/account',
  fields: {
    currentPassword:
      '//label[contains(text(),"Current Password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    newPassword: '//label[text()="Password"]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    confirmPassword:
      '//label[contains(text(),"Confirm Password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
  },
  text: {
    account: '//h6[contains(text(),"Account")]',
    popUp: '//div[contains(@class,"MuiSnackbarContent-message")]/div',
    passwordMismatch: '//form/p[contains(@class,"makeStyles-error")]',
  },
  buttons: {
    update: '//button/span[contains(text(),"Update")]',
  },
  amOnThisPage() {
    I.seeElement(this.text.account);
  },
  clickUpdate() {
    I.waitForElement(this.buttons.update);
    I.click(this.buttons.update);
  },
  fillCurrentPassword(password) {
    I.waitForElement(this.fields.currentPassword);
    I.fillField(this.fields.currentPassword, password);
  },
  fillNewPassword(password) {
    I.waitForElement(this.fields.newPassword);
    I.fillField(this.fields.newPassword, password);
  },
  fillConfirmPassword(password) {
    I.waitForElement(this.fields.confirmPassword);
    I.fillField(this.fields.confirmPassword, password);
  },
  updatePassword(currentPassword, newPassword, confirmPassword) {
    this.fillCurrentPassword(currentPassword);
    this.fillNewPassword(newPassword);
    this.fillConfirmPassword(confirmPassword);
    this.clickUpdate();
  },
};

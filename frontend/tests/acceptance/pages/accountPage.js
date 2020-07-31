const { I } = inject();
const { elementWaitTime } = require('../helpers/globals');

module.exports = {
  url: '/account',
  fields: {
    currentPassword:
      '//label[contains(text(),"Current Password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    newPassword: '//label[text()="Password"]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    confirmPassword:
      '//label[contains(text(),"Confirm Password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
  },

  elements: {
    account_page_title: '//h6[contains(text(),"Account")]',
    update_button: '//button/span[contains(text(),"Update")]',
    popup: '//div[contains(@class,"MuiSnackbarContent-message")]/div',
    error_label: '//form/p[contains(@class,"makeStyles-error")]',
  },

  async updatePassword(passwords) {
    const { currentPassword, newPassword, confirmPassword } = passwords;

    this.fillCurrentPassword(currentPassword);
    this.fillNewPassword(newPassword);
    this.fillConfirmPassword(confirmPassword);

    I.waitForElement(this.elements.update_button, elementWaitTime);
    await I.click(this.elements.update_button);
  },

  fillCurrentPassword(password) {
    I.waitForElement(this.fields.currentPassword, elementWaitTime);
    I.fillField(this.fields.currentPassword, password);
  },

  fillNewPassword(password) {
    I.waitForElement(this.fields.newPassword, elementWaitTime);
    I.fillField(this.fields.newPassword, password);
  },

  fillConfirmPassword(password) {
    I.waitForElement(this.fields.confirmPassword, elementWaitTime);
    I.fillField(this.fields.confirmPassword, password);
  },

  amOnThisPage() {
    I.waitForElement(this.elements.account_page_title, elementWaitTime);
    I.seeElement(this.elements.account_page_title);
  },
};

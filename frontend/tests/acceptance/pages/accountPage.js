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

  /**
   *
   * @param {object} passwords
   */
  async updatePassword(passwords) {
    const { currentPassword, newPassword, confirmPassword } = passwords;

    await this.fillCurrentPassword(currentPassword);
    await this.fillNewPassword(newPassword);
    await this.fillConfirmPassword(confirmPassword);

    I.waitForElement(this.elements.update_button, elementWaitTime);
    await I.click(this.elements.update_button);
  },

  /**
   *
   * @param {string} password - current account password
   */
  async fillCurrentPassword(password) {
    I.waitForElement(this.fields.currentPassword, elementWaitTime);
    await I.fillField(this.fields.currentPassword, password);
  },

  /**
   *
   * @param {string} password - new account password
   */

  async fillNewPassword(password) {
    I.waitForElement(this.fields.newPassword, elementWaitTime);
    await I.fillField(this.fields.newPassword, password);
  },

  /**
   *
   * @param {string} password - new account password
   */
  async fillConfirmPassword(password) {
    I.waitForElement(this.fields.confirmPassword, elementWaitTime);
    await I.fillField(this.fields.confirmPassword, password);
  },

  async amOnThisPage() {
    I.waitForElement(this.elements.account_page_title, elementWaitTime);
    await I.seeElement(this.elements.account_page_title);
  },
};

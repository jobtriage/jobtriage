const { path } = require('path');

module.exports = {
  url() {
    return path.join(this.api.launch_url, '/signup');
  },
  commands: {
    signUpWithDetails(name, email, password) {
      return this
        .useXpath()
        .waitForElementVisible('@nameInput')
        .clearValue('@nameInput')
        .setValue('@nameInput', name)
        .clearValue('@emailInput')
        .setValue('@emailInput', email)
        .clearValue('@passwordInput')
        .setValue('@passwordInput', password)
        .clearValue('@confirmPasswordInput')
        .setValue('@confirmPasswordInput', password)
        .click('@signUpButton')
        .pause(3000);
    },
  },
  elements: {
    nameInput: {
      selector: '//label[contains(text(),"name")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
      locateStrategy: 'xpath',
    },
    emailInput: {
      selector: '//label[contains(text(),"email")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
      locateStrategy: 'xpath',
    },
    passwordInput: {
      selector: '//label[contains(text(),"password")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
      locateStrategy: 'xpath',
    },
    confirmPasswordInput: {
      selector: '//label[contains(text(),"confirm password")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
      locateStrategy: 'xpath',
    },
    signUpButton: {
      selector: '//span[contains(text(),"Sign Up")]',
      locateStrategy: 'xpath',
    },
  },
};

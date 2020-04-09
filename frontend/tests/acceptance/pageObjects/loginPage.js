const { path } = require('path');

module.exports = {
  url() {
    return `${this.api.launch_url}/login`;
  },
  commands: {
    loginWithDetails(email, password) {
      return this
        .useXpath()
        .waitForElementVisible('@emailInput')
        .clearValue('@emailInput')
        .setValue('@emailInput', email)
        .clearValue('@passwordInput')
        .setValue('@passwordInput', password)
        .click('@loginButton')
        .pause(2000);
    },
  },
  elements: {
    emailInput: {
      selector: '//label[contains(text(),"email")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
      locateStrategy: 'xpath',
    },
    passwordInput: {
      selector: '//label[contains(text(),"password")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',
      locateStrategy: 'xpath',
    },
    loginButton: {
      selector: '//span[contains(text(),"Login")]',
      locateStrategy: 'xpath',
    },
  },
};

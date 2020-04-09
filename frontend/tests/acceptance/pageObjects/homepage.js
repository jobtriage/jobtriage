const { client } = require('nightwatch-api');

module.exports = {
  url() {
    return this.api.launch_url;
  },
  commands: {
    navigateToLoginPage() {
      return this
        .useXpath()
        .waitForElementVisible('@loginButton')
        .click('@loginButton');
    },
    navigateToSignUpPage() {
      return this
        .useXpath()
        .waitForElementVisible('@signUpButton')
        .click('@signUpButton');
    },
  },
  elements: {
    loginButton: {
      selector: '//span[contains(text(),"Login")]',
      locateStrategy: 'xpath',
    },
    signUpButton: {
      selector: '//span[contains(text(),"Sign Up")]',
      locateStrategy: 'xpath',
    },
  },
}

const { path } = require('path');

module.exports = {
  url() {
    return path.join(this.api.launch_url, '/dashboard');
  },
  commands: {
    assertDashboardIsDisplayed() {
      return this
        .useXpath()
        .waitForElementVisible('@dashboardDisplay');
    },
  },
  elements: {
    dashboardDisplay: {
      selector: '//span[contains(text(),"Dashboard")]',
      locateStrategy: 'xpath',
    },
  }
};

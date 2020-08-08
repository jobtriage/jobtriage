const { I } = inject();
const { elementWaitTime } = require('../helpers/globals');

module.exports = {
  menus: {
    dashboard: '//nav/ul/li//span[contains(text(),"Dashboard")]',
    self_analysis: '//nav/ul/li//span[contains(text(),"Self Analysis")]',
    account: '//nav/ul/li//span[contains(text(),"Account")]',
    logout: '//nav/ul/li//span[contains(text(),"Logout")]',
  },

  async navigateToDashboard() {
    I.waitForElement(this.menus.dashboard, elementWaitTime);
    await I.click(this.menus.dashboard);
  },

  async navigateToSelfAnalysis() {
    I.waitForElement(this.menus.self_analysis, elementWaitTime);
    await I.click(this.menus.self_analysis);
  },

  async navigateToAccount() {
    I.waitForElement(this.menus.account, elementWaitTime);
    await I.click(this.menus.account);
  },

  async clickLogout() {
    I.waitForElement(this.menus.logout, elementWaitTime);
    await I.click(this.menus.logout);
  },
};

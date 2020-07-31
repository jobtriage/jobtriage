const { I } = inject();
const { elementWaitTime } = require('../helpers/globals');

module.exports = {
  menus: {
    dashboard: '//nav/ul/li//span[contains(text(),"Dashboard")]',
    self_analysis: '//nav/ul/li//span[contains(text(),"Self Analysis")]',
    account: '//nav/ul/li//span[contains(text(),"Account")]',
    logout: '//nav/ul/li//span[contains(text(),"Logout")]',
  },

  navigateToDashboard() {
    I.waitForElement(this.menus.dashboard, elementWaitTime);
    I.click(this.menus.dashboard);
  },

  navigateToSelfAnalysis() {
    I.waitForElement(this.menus.self_analysis, elementWaitTime);
    I.click(this.menus.self_analysis);
  },

  navigateToAccount() {
    I.waitForElement(this.menus.account, elementWaitTime);
    I.click(this.menus.account);
  },

  clickLogout() {
    I.waitForElement(this.menus.logout, elementWaitTime);
    I.click(this.menus.logout);
  },
};

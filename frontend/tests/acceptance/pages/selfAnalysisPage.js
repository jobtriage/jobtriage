const { I } = inject();
const { elementWaitTime } = require('../helpers/globals');

module.exports = {
  url: '/self',
  elements: {
    selfAnalysis_page_title: '//h5[contains(text(),"Self Analysis")]',
  },

  amOnThisPage() {
    I.waitForElement(this.elements.selfAnalysis_page_title, elementWaitTime);
    I.seeElement(this.elements.selfAnalysis_page_title);
  },
};

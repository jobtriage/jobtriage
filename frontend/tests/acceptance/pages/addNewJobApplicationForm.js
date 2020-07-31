const { I } = inject();
const { elementWaitTime } = require('../helpers/globals');

module.exports = {
  fields: {
    title: '//label[contains(text(),"Title")]/parent::div//input[contains(@class,"MuiInputBase-input")]',
    company: '//label[contains(text(),"Company")]/parent::div//input[contains(@class,"MuiInputBase-input")]',
    status: '//label[contains(.,"Status")]/parent::div//div[contains(@class,"MuiSelect-select")]',
    location: '//label[contains(text(),"Location")]/parent::div//input[contains(@class,"MuiInputBase-input")]',
  },

  elements: {
    addjob_button: '//button[contains(@class,"MuiButton-root")]/span[contains(.,"Add")]',
    select_options: '//div[contains(@class,"MuiPopover-paper")]//li',
    popup: '//div[contains(@class,"MuiSnackbarContent-message")]/div',
    getPriorityElement(priority) {
      return `//div[contains(@class,"MuiButtonGroup")]/button/span[text()="${priority}"]`;
    },
    getStatusElement(status) {
      return `${this.select_options}[contains(.,"${status}")]`;
    },
  },

  async addNewJobApplication(job) {
    const { title, company, priority, status, location } = job;

    this.fillTitle(title);
    this.fillCompany(company);
    this.selectPriority(priority);
    this.selectStatus(status);
    this.fillLocation(location);

    I.waitForElement(this.elements.addjob_button, elementWaitTime);
    await I.click(this.elements.addjob_button);
  },

  fillTitle(title) {
    I.waitForElement(this.fields.title, elementWaitTime);
    I.fillField(this.fields.title, title);
  },

  fillCompany(company) {
    I.waitForElement(this.fields.company, elementWaitTime);
    I.fillField(this.fields.company, company);
  },

  selectPriority(priority) {
    if (priority) {
      const el_priority = this.elements.getPriorityElement(priority);
      I.waitForElement(el_priority, elementWaitTime);
      I.click(el_priority);
    }
  },

  selectStatus(status) {
    if (status) {
      I.waitForElement(this.fields.status, elementWaitTime);
      I.click(this.fields.status);
      I.click(this.elements.getStatusElement(status));
      I.dontSeeElement(this.elements.select_options);
    }
  },

  fillLocation(location) {
    I.waitForElement(this.fields.location, elementWaitTime);
    I.fillField(this.fields.location, location);
  },
};

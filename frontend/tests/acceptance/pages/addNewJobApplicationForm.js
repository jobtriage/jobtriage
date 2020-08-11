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

  /**
   *
   * @param {object} job
   */
  async addNewJobApplication(job) {
    const { title, company, priority, status, location } = job;

    await this.fillTitle(title);
    await this.fillCompany(company);
    await this.selectPriority(priority);
    await this.selectStatus(status);
    await this.fillLocation(location);

    I.waitForElement(this.elements.addjob_button, elementWaitTime);
    await I.click(this.elements.addjob_button);
  },

  /**
   *
   * @param {string} title - job application title
   */
  async fillTitle(title) {
    I.waitForElement(this.fields.title, elementWaitTime);
    await I.fillField(this.fields.title, title);
  },

  /**
   *
   * @param {string} company - company name
   */
  async fillCompany(company) {
    I.waitForElement(this.fields.company, elementWaitTime);
    await I.fillField(this.fields.company, company);
  },

  /**
   *
   * @param {string} priority - job application priority
   * [ Low, Medium and High ]
   */
  async selectPriority(priority) {
    if (priority) {
      const el_priority = this.elements.getPriorityElement(priority);
      I.waitForElement(el_priority, elementWaitTime);
      await I.click(el_priority);
    }
  },

  /**
   *
   * @param {string} status - job application status
   * [ Yet to Apply, Applied, In Progress, Accepted, Rejected ]
   */
  async selectStatus(status) {
    if (status) {
      I.waitForElement(this.fields.status, elementWaitTime);
      await I.click(this.fields.status);
      await I.click(this.elements.getStatusElement(status));
      await I.dontSeeElement(this.elements.select_options);
    }
  },

  /**
   *
   * @param {string} location - company location
   */
  async fillLocation(location) {
    I.waitForElement(this.fields.location, elementWaitTime);
    await I.fillField(this.fields.location, location);
  },
};

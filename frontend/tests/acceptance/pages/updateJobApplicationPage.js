const { I } = inject();
const { elementWaitTime } = require('../helpers/globals');

module.exports = {
  fields: {
    title: '//label[contains(text(),"Title")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    priority: '//label[contains(text(),"Priority")]/parent::div//div[contains(@aria-labelledby, "Priority")]',
    status: '//label[contains(text(),"Status")]/parent::div//div[contains(@aria-labelledby, "Status")]',
    company: '//label[contains(text(),"Company Name")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    company_link: '//label[contains(text(),"Company Link")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    job_post_url: '//label[contains(text(),"Job post url")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    description:
      '//label[contains(text(),"Description")]/parent::div//textarea[contains(@class, "MuiInputBase-input")]',
  },

  elements: {
    update_button: '//button/span[contains(text(),"Update")]',
    details_tab: '//button/span[contains(text(),"Details")]',
    notes_tab: '//button/span[contains(text(),"Notes")]',
    details_title: '//h6[text()="Application Details"]',
    notes_title: '//h6[text()="Notes"]',
    select_options: '//div[contains(@class,"MuiPopover-paper")]//li',
    selectOptions(option) {
      return `//div[contains(@class,"MuiPopover-paper")]//li[contains(.,"${option}")]`;
    },
    popup: '//div[contains(@class,"MuiSnackbarContent-message")]/div',
  },

  /**
   *
   * @param {object} job - job application details
   */
  async updateJob(job) {
    const { title, priority, status, company, company_link, job_url, description } = job;

    await this.fillTitle(title);
    await this.selectPriority(priority);
    await this.selectStatus(status);
    await this.fillCompany(company);
    await this.fillCompanyLink(company_link);
    await this.fillJobUrl(job_url);
    await this.fillDescription(description);
    await this.clickUpdate();
  },

  async updateJobwithEmptyTitle() {
    await I.click(this.fields.title);
    await I.pressKey(['CommandOrControl', 'A']);
    await I.pressKey('Backspace');
    await this.clickUpdate();
  },

  /**
   *
   * @param {string} title - job application title
   */
  async fillTitle(title) {
    I.waitForElement(this.fields.title, elementWaitTime);
    await I.clearField(this.fields.title);
    await I.fillField(this.fields.title, title);
  },

  /**
   *
   * @param {string} priority - job application priority
   * [ Low, Medium and High ]
   */
  async selectPriority(priority) {
    I.waitForElement(this.fields.priority, elementWaitTime);
    await I.click(this.fields.priority);
    await I.click(this.elements.selectOptions(priority));
    await I.dontSeeElement(this.elements.select_options);
  },

  /**
   *
   * @param {string} status - job application status
   * [ Yet to Apply, Applied, In Progress, Accepted, Rejected ]
   */
  async selectStatus(status) {
    I.waitForElement(this.fields.status, elementWaitTime);
    await I.click(this.fields.status);
    await I.click(this.elements.selectOptions(status));
    await I.dontSeeElement(this.elements.select_options);
  },

  /**
   *
   * @param {string} company - company name
   */
  async fillCompany(company) {
    I.waitForElement(this.fields.company, elementWaitTime);
    await I.clearField(this.fields.company);
    await I.fillField(this.fields.company, company);
  },

  /**
   *
   * @param {string} company_link - company website url
   */
  async fillCompanyLink(company_link) {
    I.waitForElement(this.fields.company_link, elementWaitTime);
    await I.clearField(this.fields.company_link);
    await I.fillField(this.fields.company_link, company_link);
  },

  /**
   *
   * @param {string} job_post_url - job post url
   */
  async fillJobUrl(job_post_url) {
    await I.clearField(this.fields.job_post_url);
    I.waitForElement(this.fields.job_post_url, elementWaitTime);
    await I.fillField(this.fields.job_post_url, job_post_url);
  },

  /**
   *
   * @param {string} description - job application description
   */
  async fillDescription(description) {
    I.waitForElement(this.fields.description, elementWaitTime);
    await I.clearField(this.fields.description);
    await I.fillField(this.fields.description, description);
  },

  async clickUpdate() {
    I.waitForElement(this.elements.update_button, elementWaitTime);
    await I.click(this.elements.update_button);
  },

  async gotoNotes() {
    I.waitForElement(this.elements.notes_tab, elementWaitTime);
    await I.click(this.elements.notes_tab);
  },

  async gotoDetails() {
    I.waitForElement(this.elements.details_tab, elementWaitTime);
    await I.click(this.elements.details_tab);
  },
};

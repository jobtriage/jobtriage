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

  async updateJob(job) {
    const { title, priority, status, company, company_link, job_url, description } = job;

    this.fillTitle(title);
    this.selectPriority(priority);
    this.selectStatus(status);
    this.fillCompany(company);
    this.fillCompanyLink(company_link);
    this.fillJobUrl(job_url);
    this.fillDescription(description);
    await this.clickUpdate();
  },

  async updateJobwithEmptyTitle() {
    I.click(this.fields.title);
    I.pressKey(['CommandOrControl', 'A']);
    I.pressKey('Backspace');
    await this.clickUpdate();
  },

  fillTitle(title) {
    I.waitForElement(this.fields.title, elementWaitTime);
    I.clearField(this.fields.title);
    I.fillField(this.fields.title, title);
  },

  selectPriority(priority) {
    I.waitForElement(this.fields.priority, elementWaitTime);
    I.click(this.fields.priority);
    I.click(this.elements.selectOptions(priority));
    I.dontSeeElement(this.elements.select_options);
  },

  selectStatus(status) {
    I.waitForElement(this.fields.status, elementWaitTime);
    I.click(this.fields.status);
    I.click(this.elements.selectOptions(status));
    I.dontSeeElement(this.elements.select_options);
  },

  fillCompany(company) {
    I.waitForElement(this.fields.company, elementWaitTime);
    I.clearField(this.fields.company);
    I.fillField(this.fields.company, company);
  },

  fillCompanyLink(company_link) {
    I.waitForElement(this.fields.company_link, elementWaitTime);
    I.clearField(this.fields.company_link);
    I.fillField(this.fields.company_link, company_link);
  },

  fillJobUrl(job_post_url) {
    I.clearField(this.fields.job_post_url);
    I.waitForElement(this.fields.job_post_url, elementWaitTime);
    I.fillField(this.fields.job_post_url, job_post_url);
  },

  fillDescription(description) {
    I.waitForElement(this.fields.description, elementWaitTime);
    I.clearField(this.fields.description);
    I.fillField(this.fields.description, description);
  },

  async clickUpdate() {
    I.waitForElement(this.elements.update_button, elementWaitTime);
    await I.click(this.elements.update_button);
  },

  gotoNotes() {
    I.waitForElement(this.elements.notes_tab, elementWaitTime);
    I.click(this.elements.notes_tab);
  },

  gotoDetails() {
    I.waitForElement(this.elements.details_tab, elementWaitTime);
    I.click(this.elements.details_tab);
  },
};

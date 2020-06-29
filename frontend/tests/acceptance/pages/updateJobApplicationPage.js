const { I } = inject();

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
    details_button: '//button/span[contains(text(),"Details")]',
    notes_button: '//button/span[contains(text(),"Notes")]',
    details_title: '//h6[text()="Application Details"]',
    notes_title: '//h6[text()="Notes"]',
    select_options: '//div[contains(@class,"MuiPopover-paper")]//li',
    error_message_label: '//div[text()="Update failed"]',
    success_message_label: '//div[text()="Update success"]',
  },
  updateJob(job) {
    this.fillTitle(job.title);
    this.selectPriority(job.priority);
    this.selectStatus(job.status);
    this.fillCompany(job.company);
    this.fillCompanyLink(job.company_link);
    this.fillJobUrl(job.job_url);
    this.fillDescription(job.description);
    this.clickUpdateJob();
  },
  updateJobwithEmptyTitle() {
    I.click(this.fields.title);
    I.pressKey(['CommandOrControl', 'A']);
    I.pressKey('Backspace');
    this.clickUpdateJob();
  },
  fillTitle(title) {
    I.waitForElement(this.fields.title);
    I.clearField(this.fields.title);
    I.fillField(this.fields.title, title);
  },
  selectPriority(priority) {
    I.waitForElement(this.fields.priority);
    I.click(this.fields.priority);
    I.click(this.elements.select_options + '[contains(.,"' + priority + '")]');
    I.dontSeeElement(this.elements.select_options);
  },
  selectStatus(status) {
    I.waitForElement(this.fields.status);
    I.click(this.fields.status);
    I.click(this.elements.select_options + '[contains(.,"' + status + '")]');
    I.dontSeeElement(this.elements.select_options);
  },
  fillCompany(company) {
    I.waitForElement(this.fields.company);
    I.clearField(this.fields.company);
    I.fillField(this.fields.company, company);
  },
  fillCompanyLink(company_link) {
    I.waitForElement(this.fields.company_link);
    I.clearField(this.fields.company_link);
    I.fillField(this.fields.company_link, company_link);
  },
  fillJobUrl(job_post_url) {
    I.clearField(this.fields.job_post_url);
    I.waitForElement(this.fields.job_post_url);
    I.fillField(this.fields.job_post_url, job_post_url);
  },
  fillDescription(description) {
    I.waitForElement(this.fields.description);
    I.clearField(this.fields.description);
    I.fillField(this.fields.description, description);
  },
  clickUpdateJob() {
    I.waitForElement(this.elements.update_button);
    I.click(this.elements.update_button);
  },
  gotoNotes() {
    I.waitForElement(this.elements.notes_button);
    I.click(this.elements.notes_button);
  },
  gotoDetails() {
    I.waitForElement(this.elements.details_button);
    I.click(this.elements.details_button);
  },
};

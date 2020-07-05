const { I } = inject();

module.exports = {
  fields: {
    title: '//label[contains(text(),"Title")]/parent::div//input[contains(@class,"MuiInputBase-input")]',
    company: '//label[contains(text(),"Company")]/parent::div//input[contains(@class,"MuiInputBase-input")]',
    status: '//label[contains(.,"Status")]/parent::div//div[contains(@class,"MuiSelect-select")]',
    location: '//label[contains(text(),"Location")]/parent::div//input[contains(@class,"MuiInputBase-input")]',
  },
  elements: {
    add_job_application_button: '//button[contains(@class,"MuiButton-root")]/span[contains(.,"Add")]',
    select_options: '//div[contains(@class,"MuiPopover-paper")]//li',
    error_label: '//div[contains(.,"Error in adding Job Application")]',
    success_label: '//div[contains(.,"Job Application added successfully")]',
    trello_board: '//div[contains(@class,"react-trello-board")]',
    getPriority(priority) {
      return `//div[contains(@class,"MuiButtonGroup")]/button/span[text()="${priority}"]`;
    },
  },
  addNewJobApplication(job) {
    this.fillTitle(job.title);
    this.fillCompany(job.company);
    this.selectPriority(job.priority);
    this.selectStatus(job.status);
    this.fillLocation(job.location);
    this.clickAdd();
  },
  fillTitle(title) {
    I.waitForElement(this.fields.title, 5);
    I.fillField(this.fields.title, title);
  },
  fillCompany(company) {
    I.waitForElement(this.fields.company, 5);
    I.fillField(this.fields.company, company);
  },
  selectPriority(priority) {
    if (priority) {
      const el_priority = this.elements.getPriority(priority);
      I.waitForElement(el_priority, 5);
      I.click(el_priority);
    }
  },
  selectStatus(status) {
    if (status) {
      I.waitForElement(this.fields.status, 5);
      I.click(this.fields.status);
      I.click(this.elements.select_options + '[contains(.,"' + status + '")]');
      I.dontSeeElement(this.elements.select_options);
    }
  },
  fillLocation(location) {
    I.waitForElement(this.fields.location, 5);
    I.fillField(this.fields.location, location);
  },
  clickAdd() {
    I.waitForElement(this.elements.add_job_application_button, 5);
    I.click(this.elements.add_job_application_button);
  },
};

const { I } = inject();

module.exports = {
  fields: {
    title: '//label[contains(text(),"Title")]/parent::div//input[contains(@class,"MuiInputBase-input")]',
    company: '//label[contains(text(),"Company")]/parent::div//input[contains(@class,"MuiInputBase-input")]',
    priority: '//label[contains(text(),"Priority")]/parent::div//div[contains(@class,"MuiSelect-select")]',
    status: '//label[contains(.,"Status")]/parent::div//div[contains(@class,"MuiSelect-select")]',
  },
  elements: {
    add_job_application_button: '//button[contains(@class,"MuiButton-root")]/span[contains(.,"Add")]',
    select_options: '//div[contains(@class,"MuiPopover-paper")]//li',
    error_label: '//div[contains(.,"Error in adding Job Application")]',
    success_label: '//div[contains(.,"Job Application added successfully")]',
    trello_board: '//div[contains(@class,"react-trello-board")]',
  },
  addNewJobApplication(title, company, priority, status) {
    this.fillTitle(title);
    this.fillCompany(company);
    this.selectPriority(priority);
    this.selectStatus(status);
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
      I.waitForElement(this.fields.priority, 5);
      I.click(this.fields.priority);
      I.click(this.elements.select_options + '[contains(.,"' + priority + '")]');
      I.dontSeeElement(this.elements.select_options);
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
  clickAdd() {
    I.waitForElement(this.elements.add_job_application_button, 5);
    I.click(this.elements.add_job_application_button);
  },
};

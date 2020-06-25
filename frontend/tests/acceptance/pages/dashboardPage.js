const { I } = inject();

module.exports = {
  url: '/dashboard',
  dashboardContainer: '//span[contains(.,"Dashboard")]',
  addNewDialogForm: '//div[contains(@aria-labelledby,"form-dialog-title")]',
  elements: {
    addnewjob_button: '//button[contains(@aria-label,"Add job")]',
    job_status_board_title: `//header[contains(@class,'jTaSwn')]`,
    draggable_container: `//div[contains(@class,'smooth-dnd-draggable-wrapper')]`,
    job_title: `//article/header/span`,
    delete_job: '//div[contains(@class,"smooth-dnd-draggable-wrapper")]//header//button',
    job_container: '//div[contains(@class,"sc-fzoLsD")]',
  },
  getJobStatusBoard(jobStatus) {
    I.waitForElement(this.elements.job_status_board_title);
    return `${this.statusContext(jobStatus)}${this.elements.job_container}`;
  },
  getJobTitle(title) {
    return `${this.elements.job_title}[contains(text(),"${title}")]`;
  },
  async dragAndDropWithin(jobStatus) {
    await I.scrollTo(`${this.statusContext(jobStatus)}`);
    await I.waitForElement(this.statusContext(jobStatus));
    await I.dragAndDrop(
      `${this.statusContext(jobStatus)}${this.elements.draggable_container}[2]${this.elements.job_title}`,
      `${this.dragTo(jobStatus)}`
    );
  },
  dragFrom(jobStatus) {
    return `${this.statusContext(jobStatus)}${this.elements.draggable_container}${this.elements.job_title}`;
  },
  dragTo(jobStatus) {
    return `${this.statusContext(jobStatus)}/header`;
  },
  getCardPosition(jobStatus, index) {
    return `${this.statusContext(jobStatus)}${this.elements.draggable_container}[${index}]${
      this.elements.job_title
    }[@draggable='true']`;
  },
  removeJob(jobStatus) {
    I.scrollTo(`${this.statusContext(jobStatus)}${this.elements.delete_job}`);
    I.moveCursorTo(`${this.statusContext(jobStatus)}${this.elements.delete_job}`);
    I.click(this.elements.delete_job);
  },
  statusContext(jobStatus) {
    return `${this.elements.job_status_board_title}/span[contains(.,'${jobStatus}')]/ancestor::section`;
  },
  gotoUpdateJob(title) {
    I.click(`${this.elements.job_title}[contains(text(),"${title}")]`);
  },
};

const { I } = inject();

module.exports = {
  url: '/dashboard',
  dashboardContainer: '//span[contains(.,"Dashboard")]',
  addNewDialogForm: '//div[contains(@aria-labelledby,"form-dialog-title")]',
  elements: {
    addnewjob_button: '//button[contains(@aria-label,"Add job")]',
    job_status_board_title: `//header[contains(@class,'jTaSwn')]`,
    draggable_container: `//div[contains(@class,'smooth-dnd-draggable-wrapper')]/article//span`,
    job_title: `//article/header`,
    delete_job: '//div[contains(@class,"smooth-dnd-draggable-wrapper")]//header//button',
  },
  getJobStatusBoard(jobStatus) {
    I.waitForElement(this.elements.job_status_board_title);
    return `${this.statusContext(jobStatus)}/div[contains(@class,"sc-fzoLsD")]`;
  },
  getJobTitle(title) {
    return `${this.elements.job_title}/span[contains(text(),"${title}")]`;
  },
  async dragAndDropWithin(jobStatus) {
    await I.scrollTo(`${this.statusContext(jobStatus)}`);
    await I.waitForElement(this.statusContext(jobStatus));
    await I.dragAndDrop(
      `${this.statusContext(jobStatus)}//div[contains(@class,'smooth-dnd-draggable-wrapper')][2]/article//span`,
      `${this.dragTo(jobStatus)}`
    );
  },
  dragFrom(jobStatus) {
    return `${this.statusContext(jobStatus)}${this.elements.draggable_container}`;
  },
  dragTo(jobStatus) {
    return `${this.statusContext(jobStatus)}/header`;
  },
  getCardPosition(jobStatus, index) {
    return `${this.statusContext(
      jobStatus
    )}//div[contains(@class,'smooth-dnd-draggable-wrapper')][${index}]/article//span[@draggable='true']`;
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
    I.click(`${this.elements.job_title}/span[contains(.,"${title}")]`);
  },
};

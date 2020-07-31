const { I } = inject();
const { elementWaitTime } = require('../helpers/globals');

module.exports = {
  url: '/dashboard',
  elements: {
    dashboard_container: '//span[contains(.,"Dashboard")]',
    newjob_dialog: '//div[contains(@aria-labelledby,"form-dialog-title")]',
    trello_board: '//div[contains(@class,"react-trello-board")]',
    addnewjob_button: '//button[contains(@aria-label,"Add job")]',
    job_status_board_title: `//header[contains(@class,'jTaSwn')]`,
    draggable_container: `//div[contains(@class,'smooth-dnd-draggable-wrapper')]`,
    job_title: `//article/header/span`,
    delete_job: '//div[contains(@class,"smooth-dnd-draggable-wrapper")]//header//button',
    job_container: '//div[contains(@class,"sc-fzoLsD")]',
  },

  getJobStatusBoard(jobStatus) {
    I.waitForElement(this.elements.job_status_board_title, elementWaitTime);
    return `${this.statusContext(jobStatus)}${this.elements.job_container}`;
  },

  getJobTitle(title) {
    return `${this.elements.job_title}[contains(text(),"${title}")]`;
  },

  async dragAndDrop(source, destination) {
    await I.dragAndDrop(this.dragFrom(source), this.dragTo(destination));
  },

  async dragAndDropWithin(jobStatus) {
    await I.scrollTo(`${this.statusContext(jobStatus)}`);
    await I.waitForElement(this.statusContext(jobStatus, elementWaitTime));
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

  amOnThisPage() {
    I.waitForElement(this.elements.dashboard_container, elementWaitTime);
    I.seeElement(this.elements.dashboard_container);
  },
};

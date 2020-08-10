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

  /**
   *
   * @param {string} jobStatus
   * [ Yet to Apply, Applied, In Progress, Accepted, Rejected ]
   *
   * @returns {string} - xpath of given job status board of the dashboard
   */
  getJobStatusBoard(jobStatus) {
    I.waitForElement(this.elements.job_status_board_title, elementWaitTime);
    return `${this.statusContext(jobStatus)}${this.elements.job_container}`;
  },

  /**
   *
   * @param {string} title - job application title
   *
   * @returns {string} - xpath of given job application title
   */
  getJobTitle(title) {
    return `${this.elements.job_title}[contains(text(),"${title}")]`;
  },

  /**
   *
   * @param {sring} source - job status title from which job application is to be dragged
   * @param {string} destination - job status title to which job application is to be dropped
   */
  async dragAndDrop(source, destination) {
    await I.dragAndDrop(this.dragFrom(source), this.dragTo(destination));
  },

  /**
   *
   * @param {string} jobStatus - job application status title
   */
  async dragAndDropWithin(jobStatus) {
    await I.scrollTo(`${this.statusContext(jobStatus)}`);
    await I.waitForElement(this.statusContext(jobStatus, elementWaitTime));
    await I.dragAndDrop(
      `${this.statusContext(jobStatus)}${this.elements.draggable_container}[2]${this.elements.job_title}`,
      `${this.dragTo(jobStatus)}`
    );
  },

  /**
   *
   * @param {string} jobStatus - dragAndDrop source job status title
   *
   * @returns {string} - xpath of job application to be dragged
   */
  dragFrom(jobStatus) {
    return `${this.statusContext(jobStatus)}${this.elements.draggable_container}${this.elements.job_title}`;
  },

  /**
   *
   * @param {string} jobStatus - dragAndDrop destination job status title
   *
   * @returns {string} - xpath of dragAndDrop destination job status title
   */
  dragTo(jobStatus) {
    return `${this.statusContext(jobStatus)}/header`;
  },

  /**
   *
   * @param {string} jobStatus - job application status title
   * @param {number} index - job application card position
   *
   * @returns {string} - xpath of job application card of given status and index
   */
  getCardPosition(jobStatus, index) {
    return `${this.statusContext(jobStatus)}${this.elements.draggable_container}[${index}]${
      this.elements.job_title
    }[@draggable='true']`;
  },

  /**
   *
   * @param {string} jobStatus - job application status title
   */
  async removeJob(jobStatus) {
    await I.scrollTo(`${this.statusContext(jobStatus)}${this.elements.delete_job}`);
    await I.moveCursorTo(`${this.statusContext(jobStatus)}${this.elements.delete_job}`);
    await I.click(this.elements.delete_job);
  },

  /**
   *
   * @param {string} jobStatus - job application status title
   *
   * @returns {string} - xpath of job applications container of given status
   */
  statusContext(jobStatus) {
    return `${this.elements.job_status_board_title}/span[contains(.,'${jobStatus}')]/ancestor::section`;
  },

  /**
   *
   * @param {string} title - job application title
   */
  async gotoUpdateJob(title) {
    const el_jobcard = `${this.elements.job_title}[contains(text(),"${title}")]`;
    I.waitForElement(el_jobcard, elementWaitTime);
    await I.click(el_jobcard);
  },

  async amOnThisPage() {
    I.waitForElement(this.elements.dashboard_container, elementWaitTime);
    await I.seeElement(this.elements.dashboard_container);
  },
};

module.exports = {
  url: '/dashboard',
  dashboardContainer: '//span[contains(.,"Dashboard")]',
  addNewDialogForm: '//div[contains(@aria-labelledby,"form-dialog-title")]',
  elements: {
    addnewjob_button: '//button[contains(@aria-label,"Add job")]',
    job_status_board_title: '//header[contains(@class,"jTaSwn")]',
  },
  getJobStatusBoard(jobStatus) {
    I.waitForElement(this.elements.job_status_board_title);
    return `${this.elements.job_status_board_title}/span[contains(.,"${jobStatus}")]/ancestor::section/div[contains(@class,"sc-fzoLsD")]`;
  },
};

const { I } = inject();
const newJobForm = require('../pages/addNewJobApplicationForm');
const dashboardPage = require('../pages/dashboardPage');
const { elementWaitTime } = require('../helpers/globals');
const { cleanJobApplications } = require('../helpers/customTearDown');

const ELEMENTS = newJobForm.elements;

Given('the user has opened add new job application dialog form from the dashboard', async () => {
  I.waitForElement(dashboardPage.elements.addnewjob_button, elementWaitTime);
  await I.click(dashboardPage.elements.addnewjob_button);
});

When('the user adds a new job application with the following data:', async (table) => {
  const data = table.parse().hashes()[0];
  await newJobForm.addNewJobApplication(data);
});

When('the user cancels adding a new job application', async () => {
  await I.click(dashboardPage.elements.addnewjob_button);
});

Then('the add new job application dialog form should be closed', async () => {
  await I.dontSee(dashboardPage.newjob_dialog);
});

Then('a popup message {string} should be displayed', async (message) => {
  I.waitForElement(ELEMENTS.popup, elementWaitTime);
  await I.see(message, ELEMENTS.popup);
});

Then(
  'the job application of title {string} should be added under {string} status board in the dashboard',
  async (title, status) => {
    await I.seeElement(dashboardPage.elements.trello_board, elementWaitTime);
    await within(dashboardPage.getJobStatusBoard(status), async () => {
      await I.see(title);
    });
    await cleanJobApplications();
  }
);

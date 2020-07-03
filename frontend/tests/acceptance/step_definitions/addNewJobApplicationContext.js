const { I } = inject();
const newJobDialog = require('../pages/addNewJobApplicationForm');
const dashboard = require('../pages/dashboardPage');
const { deleteJobApplication } = require('../helpers/api/job_application');
const USER_API = require('../helpers/api/user');

const ELEMENT = newJobDialog.elements;

Given('the user has opened add new job application dialog form from the dashboard', () => {
  I.amOnPage(dashboard.url);
  I.waitForElement(dashboard.elements.addnewjob_button, 5);
  I.click(dashboard.elements.addnewjob_button);
});

When('the user adds a new job application with the following data:', (table) => {
  const newJob = table.parse().hashes()[0];
  newJobDialog.addNewJobApplication(newJob.title, newJob.company, newJob.priority, newJob.status);
});

When('the user cancels adding a new job application', () => {
  I.click(dashboard.elements.addnewjob_button);
});

Then('the add new job application dialog form should be closed', () => {
  I.dontSee(dashboard.addNewDialogForm);
});

Then('a success message {string} should pop up', (message) => {
  I.waitForElement(ELEMENT.success_label, 5);
  I.see(message, ELEMENT.success_label);
});

Then(
  'the job application of title {string} should be added in {string} status board in the dashboard',
  async (title, status) => {
    I.seeElement(ELEMENT.trello_board);
    within(dashboard.getJobStatusBoard(status), () => {
      I.see(title);
    });
    await tearDown();
  }
);

Then('an error message {string} should pop up', (message) => {
  I.waitForElement(ELEMENT.error_label, 5);
  I.see(message, ELEMENT.error_label);
});

async function tearDown() {
  const token = await I.grabCookie('token');
  await deleteJobApplication(token.value);
  I.clearCookie();
}

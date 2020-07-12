const { I } = inject();
const { deleteJobApplication } = require('../helpers/api/job_application');
const updateJobPage = require('../pages/updateJobApplicationPage');
const dashboardPage = require('../pages/dashboardPage');
const navigationPage = require('../pages/navigationPage');

const FIELDS = updateJobPage.fields;
const ELEMENTS = updateJobPage.elements;

Given('the user has navigated to the dashboard', () => {
  I.amOnPage(dashboardPage.url);
});

Given('the user has navigated to update the job application of title {string} using the webUI', (title) => {
  dashboardPage.gotoUpdateJob(title);
});

When('the user updates the job application with empty job title', () => {
  updateJobPage.updateJobwithEmptyTitle();
});

Then('an update error message {string} should pop up', (message) => {
  I.waitForElement(ELEMENTS.error_message_label);
  I.see(message, ELEMENTS.error_message_label);
});

Then('the initial job title {string} should be preserved', async (title) => {
  I.waitForElement(FIELDS.title);
  I.seeInField(FIELDS.title, title);

  await tearDown();
});

When('the user updates the job application with following details:', async (table) => {
  const job = table.parse().hashes()[0];
  updateJobPage.updateJob(job);
});

Then('an update success message {string} should pop up', (message) => {
  I.waitForElement(ELEMENTS.success_message_label);
  I.see(message, ELEMENTS.success_message_label);
});

Then(
  'the job application of title {string} having company name {string} and priority {string} should appear under {string} status board in the dashboard',
  (title, company, priority, status) => {
    navigationPage.clickDashboard();
    within(dashboardPage.getJobStatusBoard(status), () => {
      I.see(title);
      I.see(company);
      I.see(priority);
    });
  }
);

Then('the following updated details should appear in the update job application page:', async (table) => {
  const job = table.parse().hashes()[0];
  dashboardPage.gotoUpdateJob(job.title);
  I.waitForElement(ELEMENTS.details_title);
  I.seeInField(FIELDS.title, job.title);
  I.seeTextEquals(job.priority, FIELDS.priority);
  I.seeTextEquals(job.status, FIELDS.status);
  I.seeInField(FIELDS.company, job.company);
  I.seeInField(FIELDS.company_link, job.company_link);
  I.seeInField(FIELDS.job_post_url, job.job_url);
  I.seeInField(FIELDS.description, job.description);

  await tearDown();
});

Given('the user is in the notes page', () => {
  updateJobPage.gotoNotes();
});

When('the user clicks notes tab', () => {
  updateJobPage.gotoNotes();
});

Then('the notes page should be displayed', () => {
  I.waitForElement(ELEMENTS.notes_title);
  I.seeElement(ELEMENTS.notes_title);
});

When('the user clicks details tab', () => {
  updateJobPage.gotoDetails();
});

Then('the details page should be displayed', () => {
  I.waitForElement(ELEMENTS.details_title);
  I.seeElement(ELEMENTS.details_title);
});

async function tearDown() {
  const token = await I.grabCookie('token');
  await deleteJobApplication(token.value);
  I.clearCookie();
}

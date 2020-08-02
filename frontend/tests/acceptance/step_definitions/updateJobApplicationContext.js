const { I } = inject();
const updateJobPage = require('../pages/updateJobApplicationPage');
const dashboardPage = require('../pages/dashboardPage');
const navigationPage = require('../pages/navigationPage');
const { cleanJobApplications } = require('../helpers/customTearDown');
const { jobID } = require('../helpers/globals');

const FIELDS = updateJobPage.fields;
const ELEMENTS = updateJobPage.elements;

Given('the user has navigated to update the job application of title {string} using the webUI', async (title) => {
  dashboardPage.gotoUpdateJob(title);
  jobID.length = 0;
  jobID.push(await getCurrentJobId());
});

When('the user updates the job application with empty job title', async () => {
  await updateJobPage.updateJobwithEmptyTitle();
});

When('the user updates the job application with following details:', async (table) => {
  const job = table.parse().hashes()[0];
  await updateJobPage.updateJob(job);
});

When('the user clicks notes tab', async () => {
  await updateJobPage.gotoNotes();
});

When('the user clicks details tab', async () => {
  await updateJobPage.gotoDetails();
});

Then('the initial job title {string} should be preserved', async (title) => {
  I.waitForElement(FIELDS.title);
  await I.seeInField(FIELDS.title, title);

  await cleanJobApplications();
});

Then('the message {string} should pop up', async (message) => {
  I.waitForElement(ELEMENTS.popup);
  await I.see(message, ELEMENTS.popup);
});

Then(
  'the job application of title {string} having company name {string} and priority {string} should appear under {string} status board in the dashboard',
  async (title, company, priority, status) => {
    await navigationPage.navigateToDashboard();
    await within(dashboardPage.getJobStatusBoard(status), async () => {
      await I.see(title);
      await I.see(company);
      await I.see(priority);
    });
  }
);

Then('the following updated details should appear in the update job application page:', async (table) => {
  const { title, priority, status, company, company_link, job_url, description } = table.parse().hashes()[0];

  await dashboardPage.gotoUpdateJob(title);
  await I.waitForElement(ELEMENTS.details_title);
  await I.seeInField(FIELDS.title, title);
  await I.seeTextEquals(priority, FIELDS.priority);
  await I.seeTextEquals(status, FIELDS.status);
  await I.seeInField(FIELDS.company, company);
  await I.seeInField(FIELDS.company_link, company_link);
  await I.seeInField(FIELDS.job_post_url, job_url);
  await I.seeInField(FIELDS.description, description);

  await cleanJobApplications();
});

Then('the notes page should be displayed', async () => {
  I.waitForElement(ELEMENTS.notes_title);
  await I.seeElement(ELEMENTS.notes_title);
  await cleanJobApplications();
});

Then('the details page should be displayed', async () => {
  I.waitForElement(ELEMENTS.details_title);
  await I.seeElement(ELEMENTS.details_title);
  await cleanJobApplications();
});

async function getCurrentJobId() {
  const url = await I.grabCurrentUrl();
  return url.split('/').pop();
}

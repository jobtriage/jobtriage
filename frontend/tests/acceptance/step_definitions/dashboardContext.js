const { I } = inject();
const dashboardPage = require('../pages/dashboardPage');
const updateJobPage = require('../pages/updateJobApplicationPage');
const { addJobApplication } = require('../helpers/api/job_application');
const { loginUser } = require('../helpers/api/user');
const { cleanJobApplications } = require('../helpers/customTearDown');

let authToken, firstJob, secondJob;

Given('the user has logged in with email {string} and password {string}', async (email, password) => {
  const response = await loginUser(email, password);
  authToken = response.token;
  await I.setCookie({ name: 'token', value: response.token, domain: 'localhost:3001/' });
});

Given('the following job application has been created:', async (table) => {
  const jobs = table.parse().hashes();
  for await (const job of jobs) {
    const { title, company, priority, status } = job;
    const data = {
      token: authToken,
      title: title,
      company: company,
      priority: priority,
      status: status.toLowerCase().replace(/ /g, ''),
    };
    await addJobApplication(data);
  }
});

Given('the user has browsed to the dashboard page', () => {
  I.amOnPage(dashboardPage.url);
});

When(
  'the user moves job application from {string} to {string} status board using the webUI',
  async (source, destination) => {
    await dashboardPage.dragAndDrop(source, destination);
  }
);

When(
  'the user moves second job application above the first job application within {string} status board using the webUI',
  async (status) => {
    await within(dashboardPage.getJobStatusBoard(status), async () => {
      firstJob = await I.grabTextFrom(dashboardPage.getCardPosition(status, 1));
      secondJob = await I.grabTextFrom(dashboardPage.getCardPosition(status, 2));
      await dashboardPage.dragAndDropWithin(status);
    });
  }
);

When('the user deletes job application of {string} status board using webUI', (status) => {
  dashboardPage.removeJob(status);
});

When(
  'the user clicks job application of title {string} from {string} status board using the webUI',
  async (title, status) => {
    await within(dashboardPage.getJobStatusBoard(status), () => {
      dashboardPage.gotoUpdateJob(title);
    });
  }
);

Then('the job application of title {string} should be moved from {string} status board', async (title, status) => {
  await within(dashboardPage.getJobStatusBoard(status), async () => {
    await I.dontSee(title);
  });
});

Then(
  'the job application of title {string} should be added in {string} status board in the dashboard',
  async (title, status) => {
    await within(dashboardPage.getJobStatusBoard(status), async () => {
      await I.see(title);
    });
    await cleanJobApplications();
  }
);

Then(
  'the second job applications should appear above the first job application within {string} status board',
  async (status) => {
    await within(dashboardPage.getJobStatusBoard(status), async () => {
      await I.see(secondJob, dashboardPage.getCardPosition(status, 1));
      await I.see(firstJob, dashboardPage.getCardPosition(status, 2));
    });
    await cleanJobApplications();
  }
);

Then('the job application of title {string} should not appear in {string} status board', async (title, status) => {
  await within(dashboardPage.getJobStatusBoard(status), async () => {
    await I.dontSee(title);
  });
});

Then('the user should be redirected to update job application page and should see following data:', async (table) => {
  const job = table.parse().hashes()[0];
  await I.see('Application Details');
  await I.seeInField(updateJobPage.fields.title, job.title);
  await I.seeTextEquals(job.priority, updateJobPage.fields.priority);
  await I.seeTextEquals(job.status, updateJobPage.fields.status);
  await I.seeInField(updateJobPage.fields.company, job.company);
  await cleanJobApplications();
});

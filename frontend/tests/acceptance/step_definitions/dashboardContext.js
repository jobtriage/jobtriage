const { I } = inject();
const dashboard = require('../pages/dashboardPage');
const { addJobApplication, deleteJobApplication } = require('../helpers/api/job_application');
const USER_API = require('../helpers/api/user');
const updateJob = require('../pages/updateJobApplicationPage');

let apiToken, firstJob, secondJob;

Given('a user has been registered with the following details:', async (table) => {
  const user = table.parse().hashes()[0];
  await USER_API.register(user.name, user.email, user.password);
});

Given('the user has logged in to the dashboard with email {string} and password {string}', async (email, password) => {
  await USER_API.login(email, password).then(async ({ token }) => {
    apiToken = token;
    I.setCookie({ name: 'token', value: token, domain: 'localhost:3001/' });
  });
});

Given('the following job application already exists:', async (table) => {
  const jobs = table.parse().hashes();
  jobs.forEach(async (job) => {
    const data = {
      token: apiToken,
      title: job.title,
      company: job.company,
      priority: job.priority,
      status: job.status.toLowerCase().replace(/ /g, ''),
    };
    await addJobApplication(data);
  });
});

When('the user moves job application from {string} to {string} status board using the webUI', (source, destination) => {
  I.amOnPage(dashboard.url);
  I.dragAndDrop(dashboard.dragFrom(source), dashboard.dragTo(destination));
});

Then('the job application of title {string} should be moved from {string} status board', async (title, status) => {
  within(dashboard.getJobStatusBoard(status), () => {
    I.dontSee(title);
  });
});

Then(
  'the job application of title {string} should be added in {string} status board in the dashboard',
  async (title, status) => {
    within(dashboard.getJobStatusBoard(status), () => {
      I.see(title);
    });
    await tearDown();
  }
);

When(
  'the user moves second job application above the first job application within {string} status board using the webUI',
  async (status) => {
    I.amOnPage(dashboard.url);
    within(dashboard.getJobStatusBoard(status), async () => {
      firstJob = await I.grabTextFrom(dashboard.getCardPosition(status, 1));
      secondJob = await I.grabTextFrom(dashboard.getCardPosition(status, 2));
      await dashboard.dragAndDropWithin(status);
    });
  }
);

Then(
  'the second job applications should appear above the first job application within {string} status board',
  async (status) => {
    within(dashboard.getJobStatusBoard(status), () => {
      I.see(secondJob, dashboard.getCardPosition(status, 1));
      I.see(firstJob, dashboard.getCardPosition(status, 2));
    });
    await tearDown();
  }
);

When('the user deletes job application of {string} status board using webUI', async (status) => {
  I.amOnPage(dashboard.url);
  dashboard.removeJob(status);
});

Then('the job application of title {string} should not appear in {string} status board', async (title, status) => {
  within(dashboard.getJobStatusBoard(status), () => {
    I.dontSee(title);
  });
});

When(
  'the user clicks job application of title {string} from {string} status board using the webUI',
  async (title, status) => {
    I.amOnPage(dashboard.url);
    within(dashboard.getJobStatusBoard(status), () => {
      dashboard.gotoUpdateJob(title);
    });
  }
);

Then('the user should be redirected to update job application page and should see following data:', async (table) => {
  const job = table.parse().hashes()[0];
  I.see('Application Details');
  I.seeInField(updateJob.fields.title, job.title);
  I.seeTextEquals(job.priority, updateJob.fields.priority);
  I.seeTextEquals(job.status, updateJob.fields.status);
  I.seeInField(updateJob.fields.company, job.company);
  await tearDown();
});

async function tearDown() {
  const token = await I.grabCookie('token');
  await deleteJobApplication(token.value);
  I.clearCookie();
}

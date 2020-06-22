const { I } = inject();
const newJobDialog = require('../pages/addNewJobApplicationForm');
const dashboard = require('../pages/dashboardPage');
const { loginUser, registerUser, deleteJobApplication } = require('../helpers/apiHelper');
const { appUrl } = require('../globals');

const ELEMENT = newJobDialog.elements;

Given('the user has been registered with the following details:', async (table) => {
  const user = table.parse().hashes()[0];
  registerUser(user.name, user.email, user.password);
});

Given(
  'the user has logged in to the dashboard with email {string} and password {string} using the webUI',
  async (email, password) => {
    I.amOnPage(appUrl);
    await loginUser(email, password).then(({ token }) => {
      I.setCookie({ name: 'token', value: token });
    });
  }
);

Given('the user has opened add new job application dialog form from the dashboard', () => {
  I.amOnPage(dashboard.url);
  I.retry({ retries: 3, maxTimeout: 1000 }).waitForElement(dashboard.elements.addnewjob_button);
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
  I.waitForElement(ELEMENT.success_label);
  I.see(message, ELEMENT.success_label);
});

Then(
  'the newly added job application of title {string} should be added inside {string} status board in the dashboard',
  async (title, status) => {
    within(dashboard.getJobStatusBoard(status), () => {
      I.see(title);
    });
    tearDown();
  }
);

Then('an error message {string} should pop up', (message) => {
  I.waitForElement(ELEMENT.error_label);
  I.see(message, ELEMENT.error_label);
});

async function tearDown() {
  const token = await I.grabCookie('token');
  deleteJobApplication(token);
  I.clearCookie();
}

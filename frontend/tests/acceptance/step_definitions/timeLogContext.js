const { I } = inject();
const { deleteJobApplication } = require('../helpers/api/job_application');
const { addTimeLog, deleteTimeLog } = require('../helpers/api/timelog');
const timeLogPage = require('../pages/timeLogPage');
const { getMonthNumber, formatDay, formatHour } = require('../helpers/calendarHelper');

let jobID;

When('the user adds a new time log with following details:', async (table) => {
  jobID = await getCurrentJobId();
  const log = table.parse().hashes()[0];
  timeLogPage.addTimeLog(log);
});

Then('the new time log should be displayed with following details:', async (table) => {
  const log = table.parse().hashes()[0];
  I.refreshPage();
  within(timeLogPage.elements.timelog_container, () => {
    I.see(log.type.toUpperCase());
    I.see(log.note);
  });
  await tearDown();
});

Given('the following time log has been created:', async (table) => {
  jobID = await getCurrentJobId();
  const log = table.parse().hashes()[0];
  const token = await I.grabCookie('token');

  let timelog = `${formatDay(log.day)}/${getMonthNumber(log.month)}/${log.year} ${formatHour(log.hour, log.period)}:${
    log.minute
  }`;

  const data = {
    jobId: await getCurrentJobId(),
    token: token.value,
    type: log.type.toLowerCase(),
    note: log.note,
    time: timelog,
  };
  await addTimeLog(data);
  I.refreshPage();
});

When('the user updates the time log of type {string} with following details:', (type, table) => {
  const log = table.parse().hashes()[0];
  timeLogPage.updateTimeLog(type, log);
});

Then('the time log should have the type {string} and note {string}', async (type, note) => {
  I.refreshPage();
  within(timeLogPage.elements.timelog_container, () => {
    I.see(type.toUpperCase());
    I.see(note);
  });
  await tearDown();
});

When('the user deletes time log of type {string} using the webUI', (type) => {
  timeLogPage.deleteTimeLog(type);
});

Then('the time log of type {string} should not exist', (type) => {
  I.refreshPage();
  within(timeLogPage.elements.timelog_container, () => {
    I.dontSee(type.toUpperCase());
  });
});

When('he user adds time log with type {string} to the calendar using the WebUI', (type) => {
  timeLogPage.addToCalendar(type);
});

Then('the user should be redirected to google calendar', async () => {
  I.switchToNextTab();
  I.waitInUrl('google.com/', 5);
  I.seeInCurrentUrl('google.com/');
  I.switchToPreviousTab();
  await tearDown();
});

async function tearDown() {
  const token = await I.grabCookie('token');
  const idToken = {
    jobId: jobID,
    token: token.value,
  };
  await deleteTimeLog(idToken);
  await deleteJobApplication(token.value);
  I.clearCookie();
}

async function getCurrentJobId() {
  const url = await I.grabCurrentUrl();
  return url.split('/').pop();
}

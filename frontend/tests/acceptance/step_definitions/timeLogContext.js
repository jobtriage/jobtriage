const { I } = inject();
const { deleteJobApplication } = require('../helpers/api/job_application');
const { addTimeLog, deleteTimeLog } = require('../helpers/api/timelog');
const timeLogPage = require('../pages/timeLogPage');
const { split } = require('lodash');

let jobID;

When('the user adds a new time log with following details:', async (table) => {
  jobID = await getJobId();
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
  jobID = await getJobId();
  const log = table.parse().hashes()[0];
  const token = await I.grabCookie('token');

  let timelog = `${formatDay(log.day)}/${getMonthNumber(log.month)}/${log.year} ${formatHour(log.hour, log.period)}:${
    log.minute
  }`;

  const data = {
    jobId: await getJobId(),
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

Then('the time log should be updated with new type {string} and new note {string}', async (type, note) => {
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

When('the user clicks add to calender button of time log having type {string} using the webUI', (type) => {
  timeLogPage.addToCalender(type);
});

Then('the user should be redirected to google calender', async () => {
  I.switchToNextTab();
  I.waitInUrl('google.com/', 5);
  I.seeInCurrentUrl('google.com/');
  I.switchToPreviousTab();
  await tearDown();
});

function getMonthNumber(month) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  if (months.indexOf(month) + 1 < 10) return `0${months.indexOf(month) + 1}`;
  else return months.indexOf(month) + 1;
}

function formatDay(day) {
  if (day.split('').count == 2) return day;
  else return `0${day}`;
}

function formatHour(hour, period) {
  if (period === 'AM') return hour;
  else if (parseInt(hour) <= 12) return parseInt(hour) + 12;
}

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

async function getJobId() {
  const url = await I.grabCurrentUrl();
  return url.split('/').pop();
}

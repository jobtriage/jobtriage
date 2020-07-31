const { I } = inject();
const { addTimeLog } = require('../helpers/api/timelog');
const timeLogPage = require('../pages/timeLogPage');
const { getMonthNumber, formatDayNumber, formatHour24 } = require('../helpers/calendarHelper');
const { jobID } = require('../helpers/globals');
const { cleanJobApplications, cleanJobTimeLogs } = require('../helpers/customTearDown');
const { elementWaitTime } = require('../helpers/globals');

Given('the following time log has been created:', async (table) => {
  const { type, note, day, month, year, hour, minute, period } = table.parse().hashes()[0];
  const token = await I.grabCookie('token');

  let timestamp = `${formatDayNumber(day)}/${getMonthNumber(month)}/${year} ${formatHour24(hour, period)}:${minute}`;
  const data = {
    jobId: jobID[0],
    token: token.value,
    type: type.toLowerCase(),
    note: note,
    time: timestamp,
  };
  await addTimeLog(data);
  I.refreshPage();
});

When('the user adds a new time log with following details:', async (table) => {
  const timeLog = table.parse().hashes()[0];
  await timeLogPage.addTimeLog(timeLog);
});

When('the user updates the time log of type {string} with following details:', async (previousType, table) => {
  const timeLog = table.parse().hashes()[0];
  await timeLogPage.updateTimeLog(previousType, timeLog);
});

When('the user deletes time log of type {string} using the webUI', (type) => {
  timeLogPage.deleteTimeLog(type);
});

When('he user adds time log with type {string} to the calendar using the WebUI', (type) => {
  timeLogPage.addToCalendar(type);
});

Then('the new time log should be displayed with following details:', async (table) => {
  const { type, note } = table.parse().hashes()[0];
  I.refreshPage();
  await within(timeLogPage.elements.timelog_container, async () => {
    await I.see(type.toUpperCase());
    await I.see(note);
  });
  await cleanJobTimeLogs();
  await cleanJobApplications();
});

Then('the time log should have the type {string} and note {string}', async (type, note) => {
  I.refreshPage();
  await within(timeLogPage.elements.timelog_container, async () => {
    await I.see(type.toUpperCase());
    await I.see(note);
  });
  await cleanJobTimeLogs();
  await cleanJobApplications();
});

Then('the time log of type {string} should not exist', async (type) => {
  I.refreshPage();
  await within(timeLogPage.elements.timelog_container, async () => {
    await I.dontSee(type.toUpperCase());
  });
});

Then('the user should be redirected to google calendar', async () => {
  I.switchToNextTab();
  I.waitInUrl('google.com/', elementWaitTime);
  await I.seeInCurrentUrl('google.com/');
  await I.switchToPreviousTab();

  await cleanJobTimeLogs();
  await cleanJobApplications();
});

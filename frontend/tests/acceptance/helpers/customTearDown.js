const { I } = inject();
const { deleteJobApplication } = require('./api/job_application');
const { deleteNote } = require('../helpers/api/notes');
const { deleteTimeLog } = require('../helpers/api/timelog');
const { jobID } = require('../helpers/globals');

module.exports = {
  async cleanJobApplications() {
    const authToken = await getToken();
    await deleteJobApplication(authToken);
    await I.clearCookie();
  },
  async cleanJobNotes() {
    const authToken = await getToken();
    const data = {
      jobId: jobID[0],
      token: authToken,
    };
    await deleteNote(data);
    jobID.length = 0;
  },
  async cleanJobTimeLogs() {
    const authToken = await getToken();
    const data = {
      jobId: jobID[0],
      token: authToken,
    };
    await deleteTimeLog(data);
    jobID.length = 0;
  },
};
async function getToken() {
  const token = await I.grabCookie('token');
  return token.value;
}

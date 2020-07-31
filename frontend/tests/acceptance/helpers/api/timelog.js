const axios = require('axios');
const { serverUrl } = require('../constants');
const { I } = inject();

const httpRequest = axios.create({
  baseURL: `${serverUrl}/applications/`,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

module.exports = {
  addTimeLog: async (data) => {
    const { token, jobId, type, note, time } = data;
    httpRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      await httpRequest.post(`${jobId}/timelogs`, {
        type: type,
        note: note,
        time: time,
      });
      I.say('Time log added');
    } catch (err) {
      console.log(
        `Cannot add time log\n` +
          `Error: ${err.response.status} - ${err.response.statusText}\n` +
          `<< Error Details >>${err.response.data.error}\n`
      );
      throw new Error(err);
    }
  },
  deleteTimeLog: async (data) => {
    const { jobId, token } = data;
    httpRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      timelogs = await getTimeLogs(jobId, token);
      timelogs.forEach(async (timelog) => {
        try {
          await httpRequest.delete(`${jobId}/timelogs/${timelog.id}`);
          I.say('Time log(s) cleared');
        } catch (err) {
          console.log(
            `Cannot delete time logs\n` +
              `Error: ${err.response.status} - ${err.response.statusText}\n` +
              `<< Error Details >>${err.response.data.error}\n`
          );
          throw new Error(err);
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};

async function getTimeLogs(jobId, token) {
  httpRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let logs = [];
  try {
    logs = await httpRequest.get(`${jobId}/timelogs`).then(({ data }) => data);
  } catch (err) {
    console.log(
      `Cannot fetch time logs\n` +
        `Error: ${err.response.status} - ${err.response.statusText}\n` +
        `<< Error Details >>${err.response.data.error}\n`
    );
    throw new Error(err);
  }
  return logs;
}

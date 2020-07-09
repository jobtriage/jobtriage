const axios = require('axios');
const { serverUrl } = require('../constants');
const { I } = inject();

module.exports = {
  addTimeLog: async (data) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    console.log(data);
    try {
      await axios.post(`${serverUrl}/applications/${data.jobId}/timelogs`, {
        type: data.type,
        note: data.note,
        time: data.time,
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
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    try {
      logs = await getTimeLogs(data.jobId, data.token);
      if (logs.length != 0) {
        logs.forEach(async (log) => {
          try {
            await axios.delete(`${serverUrl}/applications/${data.jobId}/timelogs/${log.id}`);
            I.say('Time log cleared');
          } catch (err) {
            console.log(
              `Cannot delete time logs\n` +
                `Error: ${err.response.status} - ${err.response.statusText}\n` +
                `<< Error Details >>${err.response.data.error}\n`
            );
            throw new Error(err);
          }
        });
      }
    } catch (err) {
      console.log(
        `Cannot fetch time logs\n` +
          `Error: ${err.response.status} - ${err.response.statusText}\n` +
          `<< Error Details >>${err.response.data.error}\n`
      );
      throw new Error(err);
    }
  },
};

async function getTimeLogs(jobId, token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let logs = [];
  try {
    logs = await axios.get(`${serverUrl}/applications/${jobId}/timelogs`).then(({ data }) => data);
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

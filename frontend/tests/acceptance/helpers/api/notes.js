const axios = require('axios');
const { serverUrl } = require('../constants');
const { I } = inject();

const httpRequest = axios.create({
  baseURL: `${serverUrl}/applications/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = {
  addNote: async (data) => {
    const { jobId, token, title, content } = data;
    httpRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      await httpRequest.post(`${jobId}/notes`, {
        title: title,
        content: content,
      });
      await I.say('Job note added');
    } catch (err) {
      console.log(
        `Cannot add job note\n` +
          `Error: ${err.response.status} - ${err.response.statusText}\n` +
          `<< Error Details >>${err.response.data.error}\n`
      );
      throw new Error(err);
    }
  },
  deleteNote: async (data) => {
    const { jobId, token } = data;
    httpRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      notes = await getJobNotes(jobId, token);
      notes.forEach(async (note) => {
        try {
          await httpRequest.delete(`${jobId}/notes/${note.id}`);
          await I.say('Job note(s) cleared');
        } catch (err) {
          console.log(
            `Cannot delete job notes\n` +
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

async function getJobNotes(jobId, token) {
  httpRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let notes = [];
  try {
    notes = await httpRequest.get(`${jobId}/notes`).then(({ data }) => data);
  } catch (err) {
    console.log(
      `Cannot fetch job notes\n` +
        `Error: ${err.response.status} - ${err.response.statusText}\n` +
        `<< Error Details >>${err.response.data.error}\n`
    );
    throw new Error(err);
  }
  return notes;
}

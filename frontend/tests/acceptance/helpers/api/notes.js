const axios = require('axios');
const { serverUrl } = require('../constants');
const { I } = inject();

module.exports = {
  addNote: async (data) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    try {
      await axios.post(`${serverUrl}/applications/${data.jobId}/notes`, {
        title: data.title,
        content: data.content,
      });
      I.say('Job note added');
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
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    try {
      notes = await getJobNotes(data.jobId, data.token);
      if (notes.length != 0) {
        notes.forEach(async (note) => {
          try {
            await axios.delete(`${serverUrl}/applications/${data.jobId}/notes/${note.id}`);
            I.say('Job note cleared');
          } catch (err) {
            console.log(
              `Cannot delete job notes\n` +
                `Error: ${err.response.status} - ${err.response.statusText}\n` +
                `<< Error Details >>${err.response.data.error}\n`
            );
            throw new Error(err);
          }
        });
      }
    } catch (err) {
      console.log(
        `Cannot fetch job notes\n` +
          `Error: ${err.response.status} - ${err.response.statusText}\n` +
          `<< Error Details >>${err.response.data.error}\n`
      );
      throw new Error(err);
    }
  },
};

async function getJobNotes(jobId, token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let notes = [];
  try {
    notes = await axios.get(`${serverUrl}/applications/${jobId}/notes`).then(({ data }) => data);
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

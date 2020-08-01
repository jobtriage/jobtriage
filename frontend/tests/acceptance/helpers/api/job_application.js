const axios = require('axios');
const { serverUrl } = require('../constants');
const { I } = inject();

const httpRequest = axios.create({
  baseURL: `${serverUrl}/applications`,
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = {
  addJobApplication: async (data) => {
    httpRequest.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    const priority = getPriorityID(data.priority);
    try {
      await httpRequest.post('/', {
        title: data.title,
        status: data.status,
        priority: priority,
        company_name: data.company,
      });
      await I.say('Job application(s) added');
    } catch (err) {
      console.log(
        `Cannot add job application\n` +
          `Error: ${err.response.status} - ${err.response.statusText}\n` +
          `<< Error Details >>${err.response.data.error}\n`
      );
      throw new Error(err);
    }
  },

  deleteJobApplication: async (token) => {
    httpRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      jobs = await getJobApplications(token);
      jobs.forEach(async (job) => {
        try {
          await httpRequest.delete(`/${job.id}`);
          I.say('Job application(s) cleared');
        } catch (err) {
          console.log(
            `Cannot delete job application\n` +
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

async function getJobApplications(token) {
  httpRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let jobs = [];
  try {
    jobs = await httpRequest.get('/').then(({ data }) => data);
  } catch (err) {
    console.log(
      `Cannot fetch job applications\n` +
        `Error: ${err.response.status} - ${err.response.statusText}\n` +
        `<< Error Details >>${err.response.data.error}\n`
    );
    throw new Error(err);
  }
  return jobs;
}

function getPriorityID(priority) {
  switch (priority) {
    case 'Low':
      return 1;
    case 'Medium':
      return 2;
    case 'High':
      return 3;
  }
}

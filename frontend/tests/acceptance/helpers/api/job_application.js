const axios = require('axios');
const { serverUrl } = require('../constants');
const { I } = inject();

module.exports = {
  addJobApplication: async (data) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    try {
      const priority = getPriorityID(data.priority);
      await axios.post(`${serverUrl}/applications`, {
        title: data.title,
        status: data.status,
        priority: priority,
        company_name: data.company,
      });
      I.say('Job application added');
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
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      jobs = await getJobApplications(token);
      if (jobs.length != 0) {
        jobs.forEach(async (job) => {
          const priority = getPriorityID(job.priority);
          try {
            await axios.delete(`${serverUrl}/applications/${job.id}`, {
              params: { title: job.title, status: job.status, priority: priority, company_name: job.company },
            });
            I.say('Job applications cleared');
          } catch (err) {
            console.log(
              `Cannot delete job application\n` +
                `Error: ${err.response.status} - ${err.response.statusText}\n` +
                `<< Error Details >>${err.response.data.error}\n`
            );
            throw new Error(err);
          }
        });
      }
    } catch (err) {
      console.log(
        `Cannot fetch job applications\n` +
          `Error: ${err.response.status} - ${err.response.statusText}\n` +
          `<< Error Details >>${err.response.data.error}\n`
      );
      throw new Error(err);
    }
  },
};

async function getJobApplications(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let jobs = [];
  try {
    jobs = await axios.get(`${serverUrl}/applications`).then(({ data }) => data);
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

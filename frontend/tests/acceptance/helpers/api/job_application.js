const axios = require('axios');
const { serverUrl } = require('../constants');
const { I } = inject();

module.exports = {
  deleteJobApplication: async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    getJobApplications(token)
      .then((jobs) => {
        if (jobs.length != 0) {
          jobs.forEach((job) => {
            const priority = getPriorityID(job.priority);
            try {
              axios
                .delete(`${serverUrl}/applications/${job.id}`, {
                  params: { title: job.title, status: job.status, priority: priority, company_name: job.company },
                })
                .then(() => console.log('Database Cleared'))
                .catch((err) => {
                  console.log(
                    `Cannot delete job application\n` +
                      `Error: ${err.response.status} - ${err.response.statusText}\n` +
                      `<< Error Details >>${err.response.data.error}\n`
                  );
                  throw new Error(err);
                });
            } catch (e) {
              return console.log(e);
            }
          });
          jobApplications.length = 0;
        }
      })
      .catch((err) => {
        console.log(
          `Cannot fetch job applications\n` +
            `Error: ${err.response.status} - ${err.response.statusText}\n` +
            `<< Error Details >>${err.response.data.error}\n`
        );
        throw new Error(err);
      });
  },
};

async function getJobApplications(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let result = [];
  try {
    result = await axios
      .get(`${serverUrl}/applications`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) =>
        console.log(
          `Cannot get job applications\n` +
            `Error: ${err.response.status} - ${err.response.statusText}\n` +
            `<< Error Details >>${err.response.data.error}\n`
        )
      );
  } catch (e) {
    return console.log(e);
  }
  return result;
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

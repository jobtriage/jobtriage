import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const axiosInstance = axios.create(); // Axios instance for 401 redirection

axios.defaults.withCredentials = true;
axiosInstance.defaults.withCredentials = true;

const authInterceptor = response => response;
const errorHandler = error => {
  const { status } = error.response;
  if (status === 401) {
    document.location = '/';
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(authInterceptor, errorHandler);

/**
 * Get Auth data
 *
 * @returns {Promise}
 */
const isLoggedIn = () => axios.get(`${apiUrl}/auth/test`);


/**
 * @param {String} email
 * @param {String} password
 *
 * @returns {Promise}
 */
const login = (email, password) => axios.post(`${apiUrl}/auth/login/`, { email, password });


/**
 *
 * @param {String} name
 * @param {String} email
 * @param {String} password
 */
const signUp = (name, email, password) => axios.post(`${apiUrl}/auth/register`, { name, email, password });


/**
 * Get user data
 *
 * @returns {Promise}
 */
const getUserData = () => axiosInstance.get(`${apiUrl}/auth/test`);


/**
 * Get all Job applications
 *
 * @returns {Promise}
 */
const getJobApplications = () => axiosInstance.get(`${apiUrl}/applications`);


/**
 * Update JOB application status
 *
 * @param {String} id
 * @param {String} status
 */
const updateApplicationStatus = (id, status) => axiosInstance.put(`${apiUrl}/applications/${id}`, { status });


/**
 * Delete JOB application
 *
 * @param {String} id
 */
const deleteApplication = id => axiosInstance.delete(`${apiUrl}/applications/${id}`);


/**
 * Add new Job application
 *
 * @param {String} title
 * @param {String} status
 * @param {Number} priority
 * @param {String} companyName
 */
const addJobApplication = (title, status, priority, companyName) => {
  return axiosInstance.post(`${apiUrl}/applications`, {
    title,
    status,
    priority,
    company_name: companyName,
  });
};


/**
 * Add new Job application
 *
 * @param {String} title
 * @param {String} status
 * @param {Number} priority
 * @param {String} companyName
 */
const updateJobApplication = (jobId, title, status, priority, companyName) => {
  return axiosInstance.put(`${apiUrl}/applications/${jobId}`, {
    title,
    status,
    priority,
    company_name: companyName,
  });
};

/**
 * Get Job Application detail
 *
 * @param {String} jobId
 *
 * @returns {Promise}
 */
const getApplicationDetails = (jobId) => axiosInstance.get(`${apiUrl}/applications/${jobId}`);


export default {
  isLoggedIn,
  login,
  signUp,
  getUserData,
  getJobApplications,
  updateApplicationStatus,
  deleteApplication,
  addJobApplication,
  updateJobApplication,
  getApplicationDetails,
};

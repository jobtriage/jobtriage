import axios from 'axios';

const apiUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

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
 * Logout from job triage
 *
 * @returns {Promise}
 */
const logout = () => axios.post(`${apiUrl}/auth/logout/`);


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
 *
 * @returns {Promise}
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
 * @param {object} jobDetail
 *
 * @returns {Promise}
 */
const updateJobApplication = (applicationId, jobDetail) => {
  return axiosInstance.put(`${apiUrl}/applications/${applicationId}`, jobDetail);
};

/**
 * Get Job Application detail
 *
 * @param {String} applicationId
 *
 * @returns {Promise}
 */
const getApplicationDetails = (applicationId) => axiosInstance.get(`${apiUrl}/applications/${applicationId}`);


/**
 * @param {String} applicationId
 * @param {String} title
 * @param {String} content
 *
 * @returns {Promise}
 */
const addNotes = (applicationId, title, content) => {
  return axiosInstance.post(`${apiUrl}/applications/${applicationId}/notes`, { title, content });
};


/**
 * @param {String} applicationId
 * @param {String} title
 * @param {String} content
 *
 * @returns {Promise}
 */
const updateNote = (applicationId, noteId, title, content) => {
  return axiosInstance.put(`${apiUrl}/applications/${applicationId}/notes/${noteId}`, { title, content });
};


/**
 * @param {String} applicationId
 * @param {String} noteId
 *
 * @returns {Promise}
 */
const deleteNote = (applicationId, noteId) => {
  return axiosInstance.delete(`${apiUrl}/applications/${applicationId}/notes/${noteId}`);
};

/**
 * @returns {Promise}
 */
const resendVerificationMail = () => axiosInstance.get(`${apiUrl}/auth/resend`);


/**
 * @param {String} currentPassword
 * @param {String} password
 *
 * @returns {Promise}
 */
const changePassword = (currentPassword, password) => {
  return axiosInstance.post(`${apiUrl}/auth/change`, {
    current_password: currentPassword,
    password,
  });
};

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
  logout,
  addNotes,
  deleteNote,
  updateNote,
  resendVerificationMail,
  changePassword,
};

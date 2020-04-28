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
 * @param {String} applicationId
 * @param {String} type
 * @param {String} note
 * @param {String} time
 *
 * @returns {Promise}
 */
const addTimeLog = (applicationId, type, time, note) => {
  return axiosInstance.post(`${apiUrl}/applications/${applicationId}/timelogs`, {
    type,
    time,
    note,
  });
};


/**
 * @param {String} applicationId
 * @param {String} timeLogId
 * @param {String} type
 * @param {String} note
 * @param {String} time
 *
 * @returns {Promise}
 */
const updateTimeLog = (applicationId, timeLogId, type, time, note) => {
  return axiosInstance.put(`${apiUrl}/applications/${applicationId}/timelogs/${timeLogId}`, {
    type,
    time,
    note,
  });
};


/**
 * @param {String} applicationId
 * @param {String} timeLogId
 *
 * @returns {Promise}
 */
const deleteTimeLog = (applicationId, timeLogId) => {
  return axiosInstance.delete(`${apiUrl}/applications/${applicationId}/timelogs/${timeLogId}`);
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


/**
 * @param {String} email
 *
 * @returns {Promise}
 */
const generateOTP = email => axiosInstance.post(`${apiUrl}/auth/generateotp`, { email });


/**
 * @param {String} email
 * @param {String} otp
 * @param {String} password
 *
 * @returns {Promise}
 */
const verifyOTP = (email, otp, password) => {
  return axiosInstance.post(`${apiUrl}/auth/verifyotp`, {
    email,
    otp,
    password,
  });
};


/**
 * @returns {Promise}
 */
const getPitch = () => axiosInstance.get(`${apiUrl}/pitch`);


/**
 * @param {String} pitch
 *
 * @returns {Promise}
 */
const updatePitch = (pitch) => axiosInstance.post(`${apiUrl}/pitch`, { pitch });


/**
 * @returns {Promise}
 */
const getAnalyses = () => axiosInstance.get(`${apiUrl}/analyses`);


/**
 * @param {String} title
 * @param {String} content
 *
 * @returns {Promise}
 */
const addAnalysis = (title, content) => axiosInstance.post(`${apiUrl}/analyses`, { title, content });


/**
 * @param {String} title
 * @param {String} content
 *
 * @returns {Promise}
 */
const updateAnalysis = (analysisId, title, content) => {
  return axiosInstance.put(`${apiUrl}/analyses/${analysisId}`, { title, content });
};


/**
 * @param {String} analysisId
 *
 * @returns {Promise}
 */
const deleteAnalysis = (analysisId) => axiosInstance.delete(`${apiUrl}/analyses/${analysisId}`);

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
  generateOTP,
  verifyOTP,
  addTimeLog,
  deleteTimeLog,
  updateTimeLog,
  getPitch,
  updatePitch,
  getAnalyses,
  addAnalysis,
  updateAnalysis,
  deleteAnalysis,
};

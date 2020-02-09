import axios from 'axios';

axios.defaults.withCredentials = true;

const apiUrl = 'http://localhost:3000';

const isLoggedIn = () => axios.get(`${apiUrl}/auth/test`);

const login = (email, password) => axios.post(`${apiUrl}/auth/login/`, { email, password });

const signUp = (name, email, password) => axios.post(`${apiUrl}/auth/register`, { name, email, password });


export default {
  isLoggedIn,
  login,
  signUp,
};

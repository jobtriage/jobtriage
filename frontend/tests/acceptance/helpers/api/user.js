const axios = require('axios');
const { users } = require('../globals');
const { serverUrl } = require('../constants');
const { I } = inject();

const httpRequest = axios.create({
  baseURL: `${serverUrl}/auth/`,
  headers: { 'Content-Type': 'application/json' },
});

module.exports = {
  registerUser: async (user) => {
    const { name, email, password } = user;
    try {
      var res = await httpRequest.post(`register`, { name, email, password });
      users.push({ email, password });
      I.say(res.data.message);
    } catch (err) {
      console.log(
        `Cannot register new user\n` +
          `'${err.response.data.message.email}'\n` +
          `Error: ${err.response.status} - ${err.response.statusText}\n`
      );
      throw new Error(err);
    }
  },

  deleteUser: async () => {
    users.forEach(async (user) => {
      const { email, password } = user;
      try {
        var res = await httpRequest.delete(`deleteuser`, {
          params: { email, password },
        });
        I.say(res.data.message);
      } catch (err) {
        console.log(
          `Cannot delete created user\n` +
            `Error: ${err.response.status} - ${err.response.statusText}\n` +
            `<< Error Details >>${err.response.data.error}\n`
        );
        throw new Error(err);
      }
    });
    users.length = 0;
  },

  loginUser: async (email, password) => {
    try {
      let res = await httpRequest.post(`login`, { email, password });
      I.say('Login Successful');
      return { token: res.data.message.token, success: true };
    } catch (err) {
      console.log(
        `Cannot login user\n` +
          `Error: ${err.response.status} - ${err.response.statusText}\n` +
          `<< Error Details >>${err.response.data.error}\n`
      );
      throw new Error(err);
    }
  },
};

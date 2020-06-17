const axios = require("axios");
const { users } = require("../globals");
const { serverUrl } = require("../constants");
const { I } = inject();

module.exports = {
  register: async (name, email, password) => {
    try {
      var res = await axios.post(`${serverUrl}/auth/register`, { name, email, password });
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
  delete: () => {
    if (users.length != 0) {
      users.forEach(async (user) => {
        try {
          var res = await axios.delete(`${serverUrl}/auth/deleteuser`, {
            params: { email: user.email, password: user.password },
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
    }
  },
  login: async (email, password) => {
    try {
      await axios.post(`${serverUrl}/auth/login`, { email, password });
      I.say("Login Successful");
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

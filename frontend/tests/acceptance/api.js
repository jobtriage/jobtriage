const axios = require("axios");
const { users } = require("./globals");

module.exports = {
  server: process.env.REACT_APP_SERVER_URL || "http://localhost:3000",
  registerUser: async (name, email, password) => {
    try {
      await axios
        .post(`${this.server}/auth/register`, { name: name, email: email, password: password })
        .then(({ data }) => {
          users.push({ email: email, password: password });
          I.say(data.message);
        })
        .catch((err) => {
          console.log(`Cannot register new user\n${err}`);
        });
    } catch (e) {
      console.log(e);
    }
  },
  deleteUser: () => {
    if (users.length != 0) {
      users.forEach(async (user) => {
        try {
          await axios
            .delete(`${this.server}/auth/deleteuser`, { params: { email: user.email, password: user.password } })
            .then(({ data }) => I.say(data.message))
            .catch((err) =>
              console.log(
                `Cannot delete created user\nError: ${err.response.status}. ${err.response.statusText}\n<< Error Details >>${err.response.data.error}\n`
              )
            );
        } catch (e) {
          console.log(e);
        }
      });
      users.length = 0;
    }
  },
  loginUser: async () => {
    try {
      await axios
        .post(`${this.server}/auth/login`, { email, password })
        .then(() => {
          I.say("Login Successful");
        })
        .catch((err) => {
          console.log(`Cannot login\n${err}`);
        });
    } catch (e) {
      console.log(e);
    }
  },
};

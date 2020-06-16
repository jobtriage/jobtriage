const axios = require("axios");
const { users } = require("../globals");

const serverUrl = process.env.API_SERVER_URL || "http://localhost:3000";

module.exports = {
  registerUser: (name, email, password) => {
    try {
      axios
        .post(`${serverUrl}/auth/register`, { name: name, email: email, password: password })
        .then(({ data }) => {
          users.push({ email: email, password: password });
          return console.log(data.message);
        })
        .catch((err) =>
          console.log(
            `Cannot register new user\n` +
              `Error: ${err.response.status} - ${err.response.statusText}\n` +
              `<< Error Details >>${err.response.data.error}\n`
          )
        );
    } catch (e) {
      return console.log(e);
    }
  },
  deleteUser: () => {
    if (users.length != 0) {
      users.forEach((user) => {
        try {
          axios
            .delete(`${serverUrl}/auth/deleteuser`, { params: { email: user.email, password: user.password } })
            .then(({ data }) => console.log(data.message))
            .catch((err) =>
              console.log(
                `Cannot delete created user\n` +
                  `Error: ${err.response.status} - ${err.response.statusText}\n` +
                  `<< Error Details >>${err.response.data.error}\n`
              )
            );
        } catch (e) {
          return console.log(e);
        }
      });
      users.length = 0;
    }
  },
  loginUser: (email, password) => {
    try {
      axios
        .post(`${serverUrl}/auth/login`, { email, password })
        .then(() => console.log("Login Successful"))
        .catch((err) =>
          console.log(
            `Cannot login user\n` +
              `Error: ${err.response.status} - ${err.response.statusText}\n` +
              `<< Error Details >>${err.response.data.error}\n`
          )
        );
    } catch (e) {
      return console.log(e);
    }
  },
};

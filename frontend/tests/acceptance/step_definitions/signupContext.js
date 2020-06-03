const { I } = inject();
const signupPage = require("../pages/signupPage");
const loginPage = require("../pages/loginPage");
const dashboard = require("../pages/dashboardPage");
const { users } = require("../globals");
const { registerUser, deleteUser, loginUser } = require("../api");

const ELEMENT = signupPage.elements;
const FIELD = signupPage.fields;

Given("the user has browsed to signup page", () => {
  I.amOnPage(signupPage.url);
});

Given("the user with name {string}, email {string} and password {string} already exists", async (name, email, password) => {
  await registerUser(name, email, password);
});

// @validsignup
When(
  "the user tries to sign up with name {string}, valid email {string}, password {string} and confirm password {string}",
  async (name, email, password, confirmPassword) => {
    await signupPage.signUp(name, email, password, confirmPassword);
    await I.wait(5);
    users.push({ email: email, password: password });
  }
);

// @emptyfields, @invalidemail
When(
  "the user tries to sign up with name {string}, email {string}, password {string} and confirm password {string}",
  (name, email, password, confirmPassword) => {
    signupPage.tryInvalidSignup(name, email, password, confirmPassword);
  }
);

// @unmatchedpass, @registeredemail
When("the user tries to sign up with the following data:", (table) => {
  const data = table.parse().hashes()[0];
  signupPage.tryInvalidSignup(data.name, data.email, data.password, data.confirmPassword);
});

When("the user tries to go to login page", () => {
  signupPage.goToLogin();
});

Then("the user should be redirected to login page", () => {
  I.dontSee(ELEMENT.signup_btn);
  I.dontSeeInCurrentUrl(signupPage.url);
  I.seeInCurrentUrl(loginPage.url);
});

Then("the user should be redirected to dashboard", async () => {
  I.seeInCurrentUrl(dashboard.url);
});

Then("the user should be able to login with email {string} and password {string}", async (email, password) => {
  await loginUser(email, password);
});

Then(
  "the user entered name {string}, email {string}, password {string} or confirm password {string} should be preserved",
  (name, email, password, confirmPassword) => {
    I.seeInField(FIELD.name, name);
    I.seeInField(FIELD.email, email);
    I.seeInField(FIELD.password, password);
    I.seeInField(FIELD.confirmPassword, confirmPassword);
  }
);

Then("an invalid email message {string} should be displayed", (message) => {
  I.waitForElement(ELEMENT.error_lbl);
  I.see(message, ELEMENT.error_lbl);
});

Then("a password mis-match error message {string} should be displayed", (message) => {
  I.waitForElement(ELEMENT.error_lbl);
  I.see(message, ELEMENT.error_lbl);
});

Then("an already registered error message {string} should be displayed", (message) => {
  I.waitForElement(ELEMENT.error_lbl);
  I.see(message, ELEMENT.error_lbl);
});

After(() => {
  deleteUser();
});

const { I } = inject();
// Add in your custom step files

// Given('I have a defined step', () => {
//   // TODO: replace with your own step
// });

Given('the user has browsed to the homepage', () => {
  I.amOnPage('http://localhost:3001');
  I.see('Job Triage');
});

When('the user browses to the signup page using the webUI', () => {
  I.amOnPage('http://localhost:3001/signup');
  I.see('SIGN UP');
});

When('the user signs up with name {string}, email {string} and password {string} using the webUI', (name, email, password) => {
  I.fillField('//label[contains(text(),"name")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]', name);
  I.fillField('//label[contains(text(),"email")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',email);
  I.fillField('//label[contains(text(),"password")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',password);
  I.fillField('//label[contains(text(),"confirm password")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',password);
  I.click('Sign Up');
});

When('the user browses to the login page', () => {
  I.amOnPage('http://localhost:3001/login');
});

When('the user logs in with email {string} and password {string} using the webUI', (email, password) => {
  I.fillField('//label[contains(text(),"email")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]', email);
  I.fillField('//label[contains(text(),"password")]/parent::div/div/input[contains(@class, "MuiInputBase-input")]',password);
  I.click('Login');
});

Then('user should be redirected to the dashboard page', () => {
  I.seeElement('//span[contains(text(),"Dashboard")]');
});

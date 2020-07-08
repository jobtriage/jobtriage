const { I } = inject();
const navigationPage = require('../pages/navigationPage');
const userAPI = require('../helpers/api/user');
const selfAnalysisPage = require('../pages/selfAnalysisPage');
const accountPage = require('../pages/accountPage');

Given('the user has browsed to the dashboard page', () => {
  I.amOnPage('/dashboard');
});

Given('the user is in the Account page', () => {
  navigationPage.clickAccount();
});

When('the user clicks on dashboard option on the drawer using the webUI', () => {
  navigationPage.clickDashboard();
});

When('the user clicks on Self Analysis option on the drawer using the webUI', () => {
  navigationPage.clickSelfAnalysis();
});

When('the user clicks on account option on the drawer using the webUI', () => {
  navigationPage.clickAccount();
});

When('the user clicks on logout option on the drawer using the webUI', () => {
  navigationPage.clickLogout();
});

Then('the user should be redirected to the self analysis page', () => {
  selfAnalysisPage.amOnThisPage();
});

Then('the user should be redirected to account page', () => {
  accountPage.amOnThisPage();
});

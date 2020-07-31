const { I } = inject();
const navigationPage = require('../pages/navigationPage');
const selfAnalysisPage = require('../pages/selfAnalysisPage');
const accountPage = require('../pages/accountPage');

Given('the user is in the Account page', () => {
  I.amOnPage(accountPage.url);
});

When('the user clicks the dashboard option from the sidebar menu using the webUI', () => {
  navigationPage.navigateToDashboard();
});

When('the user clicks the Self Analysis option from the sidebar menu using the webUI', () => {
  navigationPage.navigateToSelfAnalysis();
});

When('the user clicks the account option from the sidebar menu using the webUI', () => {
  navigationPage.navigateToAccount();
});

When('the user clicks the logout option from the sidebar menu using the webUI', () => {
  navigationPage.clickLogout();
});

Then('the user should be redirected to the self analysis page', () => {
  selfAnalysisPage.amOnThisPage();
});

Then('the user should be redirected to the account page', () => {
  accountPage.amOnThisPage();
});

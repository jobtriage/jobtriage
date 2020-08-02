const { I } = inject();
const navigationPage = require('../pages/navigationPage');
const selfAnalysisPage = require('../pages/selfAnalysisPage');
const accountPage = require('../pages/accountPage');

Given('the user is in the Account page', async () => {
  await I.amOnPage(accountPage.url);
});

When('the user clicks the dashboard option from the sidebar menu using the webUI', async () => {
  await navigationPage.navigateToDashboard();
});

When('the user clicks the Self Analysis option from the sidebar menu using the webUI', async () => {
  navigationPage.navigateToSelfAnalysis();
});

When('the user clicks the account option from the sidebar menu using the webUI', async () => {
  await navigationPage.navigateToAccount();
});

When('the user clicks the logout option from the sidebar menu using the webUI', async () => {
  await navigationPage.clickLogout();
});

Then('the user should be redirected to the self analysis page', async () => {
  await selfAnalysisPage.amOnThisPage();
});

Then('the user should be redirected to the account page', async () => {
  await accountPage.amOnThisPage();
});

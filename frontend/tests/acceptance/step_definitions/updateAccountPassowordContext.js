const { I } = inject();
const accountPage = require('../pages/accountPage');
const { elementWaitTime } = require('../helpers/globals');

const ELEMENTS = accountPage.elements;

Given('the user has browsed to the account page', async () => {
  await I.amOnPage(accountPage.url);
});

When('the user updates password with the following credentials using the webUI', async (table) => {
  const data = table.parse().hashes()[0];
  await accountPage.updatePassword(data);
});

Then('the user should stay on the account page', async () => {
  await accountPage.amOnThisPage();
});

Then('the user should be displayed a popup with message {string}', async (message) => {
  I.waitForElement(ELEMENTS.popup, elementWaitTime);
  await I.see(message, ELEMENTS.popup);
});

Then('the password mismatch error message {string} should be displayed', async (message) => {
  I.waitForElement(ELEMENTS.error_label, elementWaitTime);
  await I.see(message, ELEMENTS.error_label);
});

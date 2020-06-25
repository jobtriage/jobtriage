const { I } = inject();
const accountPage = require("../pages/accountPage");
const userAPI = require("../helpers/api/user");
const { users } = require("../helpers/globals");

Given("the user has browsed to the account page", () => {
	I.amOnPage(accountPage.url);
});

When(
	"the user tries to update password with the following credentials using the webUI",
	(table) => {
		tableData = table.parse().hashes()[0];
		accountPage.updatePassword(
			tableData.currentPassword,
			tableData.newPassword,
			tableData.confirmPassword
		);
	}
);

Then("the user should stay on the account page", () => {
	accountPage.amOnThisPage();
});

Then(
	"the user must be able to login with email {string} and password {string}",
	async (email, password) => {
		await userAPI.login(email, password);
		users.forEach((user) => {
			if (user.email === email) {
				user.password = password;
			}
		});
	}
);

Then(
	"the user should be displayed a popup with message {string}",
	async (message) => {
		I.waitForElement(accountPage.text.popUp);
		await I.seeElement(accountPage.text.popUp);
		await I.see(message, accountPage.text.popUp);
	}
);

Then(
	"a password matching error message {string} should be displayed",
	(message) => {
		I.seeElement(accountPage.text.passwordMismatch);
		I.see(message, accountPage.text.passwordMismatch);
	}
);

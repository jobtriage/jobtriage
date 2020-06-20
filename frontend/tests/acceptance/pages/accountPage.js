const { I } = inject();

module.exports = {
	url: "/account",
	text: {
		account: '//h6[contains(text(),"Account")]',
	},
	amOnThisPage() {
		I.seeElement(this.text.account);
	},
};

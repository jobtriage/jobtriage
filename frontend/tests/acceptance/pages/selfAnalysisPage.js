const { I } = inject();

module.exports = {
	url: "/self",
	text: {
		selfAnalysis: '//h5[contains(text(),"Self Analysis")]',
  },
  amOnThisPage()
  {
    I.seeElement(this.text.selfAnalysis);
  }
};

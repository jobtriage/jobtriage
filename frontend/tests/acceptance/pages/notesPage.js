const { I } = inject();

module.exports = {
  fields: {
    title: '//label[contains(text(),"Type")]/parent::div//div[contains(@aria-labelledby, "Type")]',
    content: '//label[contains(text(),"Event time")]/parent::div//input',
  },
  elements: {
    addnote_button: '//button/span[contains(text(),"Add")]',
    updatetimelog_button: '//button/span[contains(text(),"Update")]',
    editnote_button: '//div[contains(@class,"makeStyles-cardContent")]',
    deletenote_button: '//div[contains(@class,"makeStyles-cardAction")]//*[name()="svg"]',
    addnote_dialog: '//div[contains(@class,"makeStyles-addBox")]',
  },
};

const { I } = inject();
const { elementWaitTime } = require('../helpers/globals');

module.exports = {
  fields: {
    title: '//label[contains(text(),"Title")]/parent::div//input[contains(@class,"MuiInputBase-input")]',
    content: '//label[contains(text(),"Content")]/parent::div//textarea',
  },

  elements: {
    addnote_button: '//button/span[contains(text(),"Add")]',
    updatenote_button: '//button/span[contains(text(),"Update")]',
    deletenote_button: '//div[contains(@class,"makeStyles-cardAction")]//*[name()="svg"]',
    openaddnote_dialog: '//div[contains(@class,"makeStyles-addBox")]',
    openeditnote_dialog: '//div[contains(@class,"makeStyles-cardContent")]',
    notesContainer: '//div[contains(@class,"makeStyles-notes")]',
    getNoteSingle(title) {
      return `//h6[contains(text(),"${title}")]/ancestor::div[contains(@class,"makeStyles-card")]`;
    },
  },

  async addNote(note) {
    const { title, content } = note;
    I.waitForElement(this.elements.openaddnote_dialog, elementWaitTime);
    I.click(this.elements.openaddnote_dialog);
    this.fillTitle(title);
    this.fillContent(content);

    I.waitForElement(this.elements.addnote_button, elementWaitTime);
    await I.click(this.elements.addnote_button);
  },

  async updateNote(oldTitle, note) {
    const job_note_selector = `${this.elements.getNoteSingle(oldTitle)}${this.elements.openeditnote_dialog}`;

    I.waitForElement(job_note_selector, elementWaitTime);
    I.click(job_note_selector);
    this.fillTitle(note.title);
    this.fillContent(note.content);

    I.waitForElement(this.elements.updatenote_button, elementWaitTime);
    await I.click(this.elements.updatenote_button);
  },

  fillTitle(title) {
    I.waitForElement(this.fields.title, elementWaitTime);
    I.click(this.fields.title);
    I.pressKey(['CommandOrControl', 'A']);
    I.pressKey('Backspace');
    I.fillField(this.fields.title, title);
  },

  fillContent(content) {
    I.waitForElement(this.fields.content, elementWaitTime);
    I.click(this.fields.content);
    I.pressKey(['CommandOrControl', 'A']);
    I.pressKey('Backspace');
    I.fillField(this.fields.content, content);
  },

  deleteNote(title) {
    const delete_icon = `${this.elements.getNoteSingle(title)}${this.elements.deletenote_button}`;
    I.waitForElement(delete_icon, elementWaitTime);
    I.click(delete_icon);
  },
};

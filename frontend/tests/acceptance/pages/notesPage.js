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
    await I.click(this.elements.openaddnote_dialog);
    await this.fillTitle(title);
    await this.fillContent(content);

    I.waitForElement(this.elements.addnote_button, elementWaitTime);
    await I.click(this.elements.addnote_button);
  },

  async updateNote(oldTitle, note) {
    const job_note_selector = `${this.elements.getNoteSingle(oldTitle)}${this.elements.openeditnote_dialog}`;

    I.waitForElement(job_note_selector, elementWaitTime);
    await I.click(job_note_selector);
    await this.fillTitle(note.title);
    await this.fillContent(note.content);

    I.waitForElement(this.elements.updatenote_button, elementWaitTime);
    await I.click(this.elements.updatenote_button);
  },

  async fillTitle(title) {
    I.waitForElement(this.fields.title, elementWaitTime);
    await I.click(this.fields.title);
    await I.pressKey(['CommandOrControl', 'A']);
    await I.pressKey('Backspace');
    await I.fillField(this.fields.title, title);
  },

  async fillContent(content) {
    I.waitForElement(this.fields.content, elementWaitTime);
    await I.click(this.fields.content);
    await I.pressKey(['CommandOrControl', 'A']);
    await I.pressKey('Backspace');
    await I.fillField(this.fields.content, content);
  },

  async deleteNote(title) {
    const delete_icon = `${this.elements.getNoteSingle(title)}${this.elements.deletenote_button}`;
    I.waitForElement(delete_icon, elementWaitTime);
    await I.click(delete_icon);
  },
};

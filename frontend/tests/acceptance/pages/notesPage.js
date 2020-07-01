const { I } = inject();

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
    getNoteContext(title) {
      return `//h6[contains(text(),"${title}")]/ancestor::div[contains(@class,"makeStyles-card")]`;
    },
  },
  addNote(note) {
    I.waitForElement(this.elements.openaddnote_dialog);
    I.click(this.elements.openaddnote_dialog);
    this.fillTitle(note.title);
    this.fillContent(note.content);
    this.clickAdd();
  },
  fillTitle(title) {
    I.waitForElement(this.fields.title);
    I.click(this.fields.content);
    I.pressKey(['CommandOrControl', 'A']);
    I.pressKey('Backspace');
    I.fillField(this.fields.title, title);
  },
  fillContent(content) {
    I.waitForElement(this.fields.content);
    I.click(this.fields.content);
    I.pressKey(['CommandOrControl', 'A']);
    I.pressKey('Backspace');
    I.fillField(this.fields.content, content);
  },
  clickAdd() {
    I.waitForElement(this.elements.addnote_button);
    I.click(this.elements.addnote_button);
  },
  clickUpdate() {
    I.waitForElement(this.elements.updatenote_button);
    I.click(this.elements.updatenote_button);
  },
  updateNote(oldTitle, note) {
    const job_note = `${this.elements.getNoteContext(oldTitle)}${this.elements.openeditnote_dialog}`;
    I.waitForElement(job_note);
    I.click(job_note);
    this.fillTitle(note.title);
    this.fillContent(note.content);
    this.clickUpdate();
  },
  deleteNote(title) {
    const delete_icon = `${this.elements.getNoteContext(title)}${this.elements.deletenote_button}`;
    I.waitForElement(delete_icon);
    I.click(delete_icon);
  },
};

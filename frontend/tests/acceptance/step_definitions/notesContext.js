const { I } = inject();
const updateJobPage = require('../pages/updateJobApplicationPage');
const notesPage = require('../pages/notesPage');
const { addNote } = require('../helpers/api/notes');
const { elementWaitTime } = require('../helpers/globals');
const { cleanJobApplications, cleanJobNotes } = require('../helpers/customTearDown');
const { jobID } = require('../helpers/globals');

const ELEMENTS = notesPage.elements;

Given('the user is in the notes page', async () => {
  await updateJobPage.gotoNotes();
});

Given('the following job note has been created:', async (table) => {
  const notes = table.parse().hashes();
  const token = await I.grabCookie('token');
  for await (const note of notes) {
    const { title, content } = note;
    const data = {
      jobId: jobID[0],
      token: token.value,
      title: title,
      content: content,
    };
    await addNote(data);
  }
  await I.refreshPage();
});

When('the user adds a new note with following details:', async (table) => {
  const note = table.parse().hashes()[0];
  await notesPage.addNote(note);
});

When('the user deletes job note of title {string} using the webUI', async (title) => {
  await notesPage.deleteNote(title);
});

When('the user updates the job note of title {string} with following details:', async (oldTitle, table) => {
  const note = table.parse().hashes()[0];
  await notesPage.updateNote(oldTitle, note);
});

Then('the newly created note of title {string} and content {string} should appear', async (title, content) => {
  I.waitForElement(ELEMENTS.getNoteSingle(title), 5);
  await within(ELEMENTS.notesContainer, async () => {
    await I.see(title);
    await I.see(content);
  });
  await cleanJobNotes();
  await cleanJobApplications();
});

Then('the note should be updated with new title {string} and new content {string}', async (title, content) => {
  I.waitForElement(ELEMENTS.getNoteSingle(title), elementWaitTime);
  await within(ELEMENTS.notesContainer, async () => {
    await I.see(title);
    await I.see(content);
  });
  await cleanJobNotes();
  await cleanJobApplications();
});

Then('the job note of title {string} should not exist', async (title) => {
  await within(ELEMENTS.notesContainer, async () => {
    await I.refreshPage();
    await updateJobPage.gotoNotes();
    await I.dontSee(title);
  });
  await cleanJobNotes();
  await cleanJobApplications();
});

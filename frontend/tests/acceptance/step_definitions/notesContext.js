const { I } = inject();
const { deleteJobApplication } = require('../helpers/api/job_application');
const { addNote, deleteNote } = require('../helpers/api/notes');
const updateJobPage = require('../pages/updateJobApplicationPage');
const notesPage = require('../pages/notesPage');
const { elementWaitTime } = require('../helpers/globals');

let jobID;

Given('the user is in the notes page', async () => {
  updateJobPage.elements.notes_button;
});

When('the user adds a new note with following details:', async (table) => {
  jobID = await getJobId();
  const note = table.parse().hashes()[0];
  notesPage.addNote(note);
});

Then('the newly created note of title {string} and content {string} should appear', async (title, content) => {
  I.waitForElement(notesPage.elements.getNoteContext(title), 5);
  within(notesPage.elements.notesContainer, () => {
    I.see(title);
    I.see(content);
  });
  await tearDown();
});

Given('the following job has been created:', async (table) => {
  jobID = await getJobId();
  const note = table.parse().hashes()[0];
  const token = await I.grabCookie('token');

  const data = {
    jobId: await getJobId(),
    token: token.value,
    title: note.title,
    content: note.content,
  };
  await addNote(data);
  I.refreshPage();
});

When('the user updates the job note of title {string} with following details:', (oldTitle, table) => {
  const note = table.parse().hashes()[0];
  notesPage.updateNote(oldTitle, note);
});

Then('the note should be updated with new title {string} and new content {string}', async (title, content) => {
  I.waitForElement(notesPage.elements.getNoteContext(title), elementWaitTime);
  within(notesPage.elements.notesContainer, () => {
    I.see(title);
    I.see(content);
  });
  await tearDown();
});

When('the user deletes job note of title {string} using the webUI', (title) => {
  notesPage.deleteNote(title);
});

Then('the job note of title {string} should not exist', async (title) => {
  within(notesPage.elements.notesContainer, () => {
    I.refreshPage();
    updateJobPage.gotoNotes();
    I.dontSee(title);
  });
  await tearDown();
});

async function tearDown() {
  const token = await I.grabCookie('token');
  const idToken = {
    jobId: jobID,
    token: token.value,
  };
  await deleteNote(idToken);
  await deleteJobApplication(token.value);
  I.clearCookie();
}

async function getJobId() {
  const url = await I.grabCurrentUrl();
  return url.split('/').pop();
}

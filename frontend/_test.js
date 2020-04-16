Feature('My First Test');

Scenario('test something', (I) => {
    I.amOnPage('http://localhost:3001');
    I.see('Job Triage');
});

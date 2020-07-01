const { I } = inject();

module.exports = {
  fields: {
    type: '//label[contains(text(),"Type")]/parent::div//div[contains(@aria-labelledby, "Type")]',
    time: '//label[contains(text(),"Event time")]/parent::div//input',
    note: '//label[contains(text(),"Note")]/parent::div//textarea[contains(@class, "MuiInputBase-input")]',
  },
  elements: {
    timelog_title: '//h6[text()="Time Logs"]',
    empty_message: '//h5[text()="No timelogs added yet"]',
    openaddtimelog_dialog: '//div[#aria-labelledby="Add time log"]',
    openedittimelog_button: '//span[@aria-label="Edit time log"]',
    addtimelog_button: '//button/span[contains(text(),"Add")]',
    updatetimelog_button: '//button/span[contains(text(),"Update")]',
    deletetimelog_button: '//span[@aria-label="Delete time log"]',
    addtocalender_button: '//span[@label="Add to calender"]',
    select_options: '//div[contains(@class,"MuiPopover-paper")]//li',
    timelog_container: '//div[contains(@class, "makeStyles-timeLogItem")]',
  },
};

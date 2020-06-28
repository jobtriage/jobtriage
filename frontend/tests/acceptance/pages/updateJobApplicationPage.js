const { I } = inject();

module.exports = {
  fields: {
    title: '//label[contains(text(),"Title")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    priority: '//label[contains(text(),"Priority")]/parent::div//div[contains(@aria-labelledby, "Priority")]',
    status: '//label[contains(text(),"Status")]/parent::div//div[contains(@aria-labelledby, "Status")]',
    company: '//label[contains(text(),"Company Name")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    company_link: '//label[contains(text(),"Company Link")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    job_post_url: '//label[contains(text(),"Job post url")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    description:
      '//label[contains(text(),"Description")]/parent::div//textarea[contains(@class, "MuiInputBase-input")]',
  },
  elements: {},
};

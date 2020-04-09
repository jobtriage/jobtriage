const chromedriver = require('chromedriver');

module.exports = {
  src_folders: ['tests'],
  page_objects_path: './tests/acceptance/pageObjects',
  webdriver: {
    start_process: true,
  },
  test_settings: {
    default: {
      selenium_host: 'localhost',
      webdriver: {
        server_path: chromedriver.path,
        start_process: false,
      },
      launch_url: 'http://localhost:3001',
      globals: {},
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        chromeOptions: {
          args: ['disable-gpu'],
          w3c: false,
        },
      },
    },
  },
};

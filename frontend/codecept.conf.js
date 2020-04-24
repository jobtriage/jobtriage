const LOCAL_LAUNCH_URL = 'http://localhost:3001';

exports.config = {
  output: './tests/acceptance/output',
  helpers: {
    Puppeteer: {
      url: LOCAL_LAUNCH_URL,
      show: true,
      windowSize: '1200x900',
    },
  },
  include: {
    Page: './tests/acceptance/pages/*.js',
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './tests/acceptance/features/*/*.feature',
    steps: './tests/acceptance/step_definitions/*.js',
  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: true,
    },
  },
  name: 'frontend',
};

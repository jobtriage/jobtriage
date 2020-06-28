const LOCAL_LAUNCH_URL = 'http://localhost:3001';

exports.config = {
  output: './tests/acceptance/output',
  helpers: {
    Puppeteer: {
      url: LOCAL_LAUNCH_URL,
      show: true,
      windowSize: '1440x900',
      waitForNavigation: ['networkidle0', 'domcontentloaded'],
      chrome: {
        args: ['--no-sandbox', '--window-size=1440,900'],
        defaultViewport: {
          width: 1440,
          height: 900,
        },
      },
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

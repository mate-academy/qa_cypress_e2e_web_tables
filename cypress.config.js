const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    retries: {
      runMode: 0,
      openMode: 100
    },
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {});
    }
  }
});

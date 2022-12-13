const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
    },
  },
});

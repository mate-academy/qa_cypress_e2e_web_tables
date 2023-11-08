const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportWidth: 1300,
    viewportHeight: 1520,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});

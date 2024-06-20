const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 2500,
    viewportWidth: 1320,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});

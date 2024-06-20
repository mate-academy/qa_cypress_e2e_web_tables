const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});

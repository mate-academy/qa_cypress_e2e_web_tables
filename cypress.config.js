const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1900,
    baseUrl: ('https://demoqa.com/webtables'),
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});

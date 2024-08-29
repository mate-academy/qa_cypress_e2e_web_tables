const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1300,
    viewportHeight: 850,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});

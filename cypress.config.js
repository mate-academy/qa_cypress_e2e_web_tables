const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 3200,
    viewportWidth: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});

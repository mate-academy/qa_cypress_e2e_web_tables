const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 2700,
    viewportWidth: 3000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});

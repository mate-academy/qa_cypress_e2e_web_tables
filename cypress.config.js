const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1500,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

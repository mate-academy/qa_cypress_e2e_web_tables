const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1400,
    viewportWidth: 1300
  },
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
      viewportHeight: 1080
      viewportWidth: 1920
    },
  },
});

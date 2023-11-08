const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1500,
    viewportWidth: 2000,
    setupNodeEvents(on, config) {
    }
  }
});

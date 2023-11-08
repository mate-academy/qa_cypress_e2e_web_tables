const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'hp9zvv',
  e2e: {
    baseUrl: 'https://demoqa.com/',
    setupNodeEvents(on, config) {
      // smf
    }
  }
});

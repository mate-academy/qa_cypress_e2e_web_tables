const { defineConfig } = require('cypress');

module.exports = defineConfig({

  viewportHeight: 1080,
  viewportWidth: 1320,
  e2e: {
    setupNodeEvents(on, config) {
    }
  },
  responseTimeout: 6000,
  watchForFileChanges: false
});

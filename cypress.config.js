const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1960,
    setupNodeEvents(on, config) {
      
    },
  },
});

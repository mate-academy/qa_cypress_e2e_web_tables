const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1320,
    setupNodeEvents(on, config) {
      
    },
  },
});

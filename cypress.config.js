const { defineConfig } = require('cypress');
const faker = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1200,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {}
  }
});

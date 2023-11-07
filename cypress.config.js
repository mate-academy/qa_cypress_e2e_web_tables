const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 2400,
    viewportWidth: 1600,
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: Math.random().toString().slice(2, 4),
            salary: Math.random().toString().slice(2, 6)
          };
        }
      });
    }
  }
});

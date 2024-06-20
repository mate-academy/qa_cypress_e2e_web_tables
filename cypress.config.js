const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1500,
    viewportWidth: 1800,
    setupNodeEvents(on, config) {
      on('task', {
        addWorker() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.random.number({ min: 18, max: 99 }),
            salary: faker.random.number({ min: 1000, max: 20000 })
          };
        }
      });
    }
  }
});

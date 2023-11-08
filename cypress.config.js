const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1000,
    viewportWidth: 1500,
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            userEmail: faker.internet.email(),
            age: faker.datatype.number({ min: 18, max: 60 }),
            salary: faker.datatype.number({ min: 10000, max: 30000 }),
            department: 'Insurance'
          };
        }
      });
    }
  }
});

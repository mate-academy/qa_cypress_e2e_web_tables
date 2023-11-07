const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.random.number({ min: 18, max: 60 }),
            salary: faker.random.number({ min: 10000, max: 100000 }),
            department: faker.lorem.word()
          };
        }
      });
    }
  }
});

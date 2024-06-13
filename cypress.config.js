const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1200,
    viewportWidth: 1200,
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.random.number(70),
            salary: faker.random.number(1000000),
            department: faker.random.word()
          };
        }
      });
    }
  }
});

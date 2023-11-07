const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1080,
    viewportWidth: 1320,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        addWorker() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ min: 16, max: 65 }),
            salary: faker.datatype.number({ min: 1000, max: 20000 }),
            department: faker.random.word()
          };
        }
      });
    }
  }
});

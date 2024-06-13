const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1200,
    viewportWidth: 1600,
    setupNodeEvents(on, config) {
      on('task', {
        addNewWorker() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ min: 18, max: 65 }),
            salary: faker.random.number({ min: 1, max: 30000 }),
            department: faker.lorem.word()
          };
        }
      });
    }
  }
});

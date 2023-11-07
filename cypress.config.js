const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1000,
    viewportWidth: 1200,
    setupNodeEvents(on, config) {
      on('task', {
        addNewWorker() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ min: 16}),
            salary: faker.random.number({ min: 500}),
            department: faker.random.arrayElement(['Insurance', 'Compliance', 'Legal'])
          }
        }
      });
    }
  }
});


const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1500,
    viewportWidth: 1500,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser () {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.random.number({ min: 16, max: 65 }),
            salary: faker.random.number({ min: 10000, max: 75000 }),
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});

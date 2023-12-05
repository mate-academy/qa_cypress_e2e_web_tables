const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1920,
    viewportWidth: 1080,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser () {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.random.number({ min: 16, max: 60 }),
            salary: faker.random.number(),
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});
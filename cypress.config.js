const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.random.number({ min: 18, max: 65 }),
            email: faker.internet.email(),
            salary: faker.random.number({ min: 30000, max: 100000 }),
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});

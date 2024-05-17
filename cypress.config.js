const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1500,
    viewportWidth: 1500,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        generateUser () {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.random.number({ min: 16, max: 60 }),
            salary: faker.datatype.number(),
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});

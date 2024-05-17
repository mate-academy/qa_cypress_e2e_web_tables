const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1500,
    viewportWidth: 1500,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser () {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 60 }),
            salary: faker.datatype.number(),
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});

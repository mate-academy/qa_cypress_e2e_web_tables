const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 70 }),
            salary: faker.number.int({ min: 5000, max: 10000 }),
            department: faker.lorem.word()
          };
        }
      });
    }
  }
});

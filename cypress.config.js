const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        generateUser() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ min: 18, max: 65 }),
            salary: faker.datatype.number({ min: 1000, max: 4000 })
          };
        }
      });
    }
  }
});

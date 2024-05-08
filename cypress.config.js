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
            age: faker.random.number({ min: 18, max: 65 }),
            salary: faker.random.number({ min: 6000, max: 28000 }),
            department: faker.random.word()
          };
        }
      });
    }
  }
});

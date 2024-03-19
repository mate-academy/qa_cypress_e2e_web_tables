const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: Math.floor((Math.random() * 100) + 18),
            salary: Math.floor((Math.random() * 10000) + 5000),
            department: faker.lorem.word()
          };
        }
      });
    }
  }
});

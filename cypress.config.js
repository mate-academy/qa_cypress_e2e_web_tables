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
            salary: '8000',
            age: '40',
            department: 'IT'
          };
        },
      });
    },
  },
});

const { defineConfig } = require('cypress');

const { faker } = require('@faker-js/faker'); // Ensure the correct import for the new faker package

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ min: 18, max: 65 }),
            salary: faker.datatype.number({ min: 30000, max: 100000 }),
            department: faker.commerce.department(),
          };
          return user;
        }
      });
      return config;
    }
  }
});

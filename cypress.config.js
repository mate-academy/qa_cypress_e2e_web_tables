const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const ageRandomizer = Math.floor(Math.random() * 40) + 20;
          const salaryRandomizer = Math.floor(Math.random() * 2000) + 1000;
          return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: ageRandomizer,
            salary: salaryRandomizer,
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});

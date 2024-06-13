const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1320,
    viewportWidth: 1380,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const ageRandom = Math.floor(Math.random() * 100);
          const salaryRandom = Math.floor(Math.random() * 1000);
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: ageRandom,
            salary: salaryRandom,
            department: faker.commerce.product()
          };
        }
      });
    }
  }
});

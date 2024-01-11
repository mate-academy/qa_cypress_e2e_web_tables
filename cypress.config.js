const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1380,
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomAge = Math.floor(Math.random() * 40) + 18;
          const randomSalary = Math.floor(Math.random() * 20) * 1000;

          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: randomAge,
            salary: randomSalary,
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});

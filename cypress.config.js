const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          const randomIndex = Math.floor(Math.random() * 2);
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: randomIndex + 18,
            salary: randomIndex + 1000,
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});

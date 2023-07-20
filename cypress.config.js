const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1080,
    viewportWidth: 1320,
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          const workerAge = Math.floor(Math.random() * 42) + 18;
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: workerAge,
            salary: randomNumber,
            department: 'Legal'
          };
        }
      });
    }
  }
});

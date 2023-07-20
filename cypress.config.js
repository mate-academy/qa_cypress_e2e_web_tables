const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        newWorker() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: Math.random().toString().slice(2, 3),
            salary: Math.random().toString().slice(2, 3),
            department: faker.lorem.words()
          };
        }
      });
    }
  }
});

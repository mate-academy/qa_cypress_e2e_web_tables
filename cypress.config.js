const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: Math.ceil(Math.random() * 69),
            salary: Math.floor(Math.random() * 100000),
            department: faker.lorem.word()
          };
        }
      });
    }
  }
});

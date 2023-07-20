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
            age: faker.random.number({max: 80}),
            salary: faker.random.number(),
            department: 'Insurance'
          };
        }
      });
    }
  }
});

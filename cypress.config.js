const { defineConfig } = require('cypress');

const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1720,
    viewportWidth: 1400,
    setupNodeEvents(on, config) {
      on('task', {
        newWorker() {
          const departments = ['Fire', 'Police', 'State'];
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.datatype.number({min: 18, max: 50}),
            salary: faker.random.number({min: 1000, max: 15000}),
            department: faker.random.arrayElement(departments),
          }
        }
      });
    }
  }
});

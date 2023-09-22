const { defineConfig } = require('cypress');

const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1100,
    viewportWidth: 1400,
    setupNodeEvents(on, config) {
      // implement node event listeners here on('task', {
      on('task', {
        newWorker() {
          const departments = ['Insurance', 'Compliance', 'Legal'];
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ min: 18, max: 70 }),
            salary: faker.random.number({ min: 1000, max: 10000 }),
            department: faker.random.arrayElement(departments)
          };
        }
      });
    }
  }
});

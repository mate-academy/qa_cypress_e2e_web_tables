const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        newWorker() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ min: 18, max: 60 }),
            salary: faker.random.number(),
            // eslint-disable-next-line max-len
            department: faker.random.arrayElement(['Insurance', 'Compliance', 'Legal'])
          };
        }
      });
    }
  }
});

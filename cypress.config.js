const { defineConfig } = require('cypress');
const faker = require('faker');
const department = ['Insurance', 'Compliance', 'Legal'];
const rows = [5, 10, 20, 25, 50, 100];

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        generateUser() {
          const randomIndex = Math.floor(Math.random() * 2);
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ max: 60 }),
            salary: faker.random.number(),
            // eslint-disable-next-line max-len
            department: department[randomIndex],
            rows: rows[randomIndex]
          };
        }
      });
    }
  }
});

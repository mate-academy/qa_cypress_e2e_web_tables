const { defineConfig } = require('cypress');
const faker = require('faker');
const department = ['Tester', 'Developer', 'Analytic'];
const searchField = ['21', 'cierra@example.com', 'Compliance', '12000'];

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            department: faker.random.arrayElement(department),
            searchField: faker.random.arrayElement(searchField),
          };
        },
      });
    },
  },
});

const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1080,
    viewportWidth: 1320,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          randomIndex = Math.floor(Math.random() * 2);
          departments = ['Insurance', 'Compliance', 'Legal'];
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.datatype.number({ min: 18, max: 99 }),
            email: faker.internet.email(),
            salary: faker.datatype.number(),
            department: departments[randomIndex],
          };
        },
      });
    },
  },
});

const { defineConfig } = require("cypress");
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          return {
            firstName: faker.name.firstName(),
            lastName : faker.name.lastName(),
            email: faker.internet.email(),
            age: Math.floor(18 + Math.random() * 60),
            salary: Math.floor(100 + Math.random() * 100000),
            department: faker.random.word(),
          };
        }
      })
    },
  },
});

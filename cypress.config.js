const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
         return {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          age: '25',
          email: faker.internet.email(),
          salary: '2000',
          department: faker.commerce.department()
        };
      },
    });
  },
},
});

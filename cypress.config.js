const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const firstName = faker.person.firstName();
          const lastName = faker.person.lastName();
          const email = faker.internet.email();
          const age = faker.number.int({ min: 18, max: 100 });
          const salary = faker.number.int({ min: 1000, max: 10000 });
          const department = faker.person.jobArea();
          return {
            firstName, lastName, email, age, salary, department
          };
        }
      });
    }
  }
});

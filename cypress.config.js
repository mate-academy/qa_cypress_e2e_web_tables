const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 10, max: 70 }),
            salary: faker.number.int({ min: 5000, max: 40000 }),
            department: faker.lorem.word()
          };
        },
        generateChanges() {
          return {
            changedName: faker.person.firstName(),
            changedLastName: faker.person.lastName(),
            changedEmail: faker.internet.email(),
            changedAge: faker.number.int({ min: 10, max: 70 }),
            changedSalary: faker.number.int({ min: 5000, max: 40000 }),
            changed_department: faker.lorem.word()
          };
        }
      });
    }
  }
});

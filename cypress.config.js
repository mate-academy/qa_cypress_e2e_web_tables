const { defineConfig } = require('cypress');
const { faker } = require(`@faker-js/faker`);

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateNewUser() {
          return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 65 }),
            salary: faker.number.int({ min: 10000, max: 30000 }),
            department: faker.lorem.word()
          };
        }
      });
    }
  }
});

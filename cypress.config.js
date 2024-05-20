const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            firstName: faker.person.firstName() + randomNumber,
            lastName: faker.person.firstName() + randomNumber,
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 75 }),
            salary: faker.number.int({ min: 1000, max: 1000000000 }),
            department: faker.lorem.word()
          };
        }
      });
    }
  }
});

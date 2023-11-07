const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1500,
    viewportWidth: 1500,
    setupNodeEvents(on, config) {
      on('task', {
        newUser () {
          return {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ min: 18, max: 60 }),
            salary: faker.datatype.number({ min: 10000, max: 100000 }),
            department: faker.lorem.word()
          };
        }
      });
    }
  }
});

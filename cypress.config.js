const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1000,
    viewportWidth: 1000,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: getRandomInt(18, 60),
            salary: getRandomInt(1000, 25000),
            department: 'eco'
          };
        }
      });
    }
  }
});

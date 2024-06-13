const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            firstname: faker.name.firstName() + randomNumber,
            lastname: faker.name.lastName() + randomNumber,
            email: faker.internet.email(),
            age: faker.random.number({ min: 18, max: 65 }),
            salary: faker.random.number({ min: 30000, max: 100000 }),
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});

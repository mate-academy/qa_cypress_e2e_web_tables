const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.floor(Math.random(10000) * 100000);
          const randomAge = Math.floor(Math.random(100) * 100);
          return {
            userName: faker.name.firstName(),
            userLastName: faker.name.lastName(),
            email: faker.name.firstName() + randomNumber + '@qatest.com',
            password: '12345Qwert!',
            address: faker.address.streetAddress(),
            salary: randomNumber,
            age: randomAge,
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});

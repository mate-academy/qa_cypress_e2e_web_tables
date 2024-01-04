const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

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
          const gender = faker.person.sex();
          return {
            userName: faker.person.firstName(gender),
            userLastName: faker.person.lastName(gender),
            email: faker.person.firstName() + randomNumber + '@qatest.com',
            password: '12345Qwert!',
            address: faker.location.streetAddress(),
            salary: randomNumber,
            age: randomAge,
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});

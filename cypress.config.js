const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  viewportWidth: 1500,
  viewportHeight: 1500,
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          const gender = faker.person.sex();
          return {
            userName: faker.person.firstName(gender),
            userSurname: faker.person.lastName(gender),
            genderr: gender,
            email: faker.person.firstName() + randomNumber + '@test.com',
            sallary: randomNumber,
            password: 'password',
            address: faker.location.streetAddress(),
            number: randomNumber,
            department: faker.commerce.department()
          };
        }
      });
    }
  }
});

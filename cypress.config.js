const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/',

    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          randomIndex = Math.floor(Math.random() * 100);
          return {
            firstName: faker.person.firstName() + randomIndex,
            lastName: faker.person.lastName() + randomIndex,
            email: randomIndex + faker.internet.email(),
            age: faker.date.birthdate('age'),
            salary: faker.finance.amount('1000', '5000', 0),
            department: faker.commerce.department(),
          };
        },
      });
    },
  },
});

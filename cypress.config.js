const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        addNewWorker() {
          const firstName = faker.lorem.word();
          const lastName = faker.lorem.word();
          const email = faker.internet.email();
          const age = faker.random.number({ min: 5, max: 70 });
          const salary = Math.floor(Math.random(10) * 1000);
          const department = faker.lorem.word();
          return {
            firstName,
            lastName,
            email: email.toLowerCase(),
            age,
            salary,
            department
          };
        }
      });
    }
  }
});

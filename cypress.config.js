const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          const firstName = faker.name.firstName();
          const lastName = faker.name.lastName();
          const email = faker.internet.email();
          const age = faker.random
            .number({ min: 18, max: 60 }).toString();
          const salary = faker.random
            .number({ min: 8000, max: 30000 }).toString();
          const department = faker.commerce.department();

          return { firstName, lastName, email, age, salary, department };
        }
      });
    }
  }
});

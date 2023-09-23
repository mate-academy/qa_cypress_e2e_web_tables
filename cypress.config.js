const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        newWorker() {
          const firstName = faker.name.firstName();
          const lastName = faker.name.lastName();
          const email = faker.internet.email();
          const age = 19;
          const salary = faker.random
            .number({ min: 8000, max: 30000 }).toString();
          const department = faker.commerce.department();

          return { firstName, lastName, email, age, salary, department };
        },
        editWorker() {
          const firstName = 'Donald';
          const lastName = 'Trump';
          const email = 'Donald_Trump@big.boss';
          const age = 19;
          const salary = 0;
          const department = 'plot';

          return { firstName, lastName, email, age, salary, department };
        }
      });
    }
  }
});

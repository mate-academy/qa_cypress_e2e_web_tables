const { faker } = require('@faker-js/faker');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
      on('task', {
        generateWorkers() {
          const workers = [];
          for (let i = 0; i < 5; i++) {
            workers.push({
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              email: faker.internet.email(),
              age: faker.number.int({ min: 18, max: 100 }),
              salary: faker.finance.pin(),
              department: faker.person.jobArea()
            });
          }
          return workers;
        }
      });
    }
  }
});

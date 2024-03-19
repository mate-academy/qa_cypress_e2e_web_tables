const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          const newWorkers = [];
          for (let i = 0; i < 3; i++) {
            newWorkers.push({
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              email: faker.internet.email(),
              age: faker.number.int({ min: 18, max: 100 }),
              salary: faker.finance.pin(),
              department: faker.person.jobArea()
            });
          }
          return newWorkers;
        }
      });
    }
  }
});

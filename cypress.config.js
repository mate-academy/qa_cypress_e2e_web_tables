const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1200,
    viewportWidth: 1600,
    setupNodeEvents(on, config) {
      on('task', {
        addNewWorker() {
          const randomIndex = Math.floor(Math.random() * 2);
          const newRandomNumber = Math.floor(Math.random(1000) * 1000);
          const workerAge = Math.floor(Math.random() * 42) + 18;
          const departments = ['Insurance', 'Compliance', 'Legal'];
          return {
            firstName: faker.name.firstName() + newRandomNumber,
            lastName: faker.name.lastName() + newRandomNumber,
            email: faker.internet.email(),
            age: workerAge,
            salary: newRandomNumber,
            department: departments[randomIndex]
          };
        }
      });
    }
  }
});

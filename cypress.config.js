const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1300,
    viewportWidth: 1800,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        addWorker() {
          const randomIndex = Math.floor(Math.random() * 2);
          const randomSalary = Math.floor(Math.random() * 10000) + 200;
          const randomAge = Math.floor(Math.random() * 40) + 15;
          const departments = ['Insurance', 'Compliance', 'Legal'];
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: randomAge,
            salary: randomSalary,
            department: departments[randomIndex]
          };
        }
      });
    }
  }
});

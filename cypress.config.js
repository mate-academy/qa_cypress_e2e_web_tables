const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportWidth: 1920,
    viewportHeight:1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        generateWorker() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          const departments = ['Insurance', 'Compliance', 'Legal']
          return {
            firstname: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: email.toLowerCase(),
            age: randomNumber,
            salary: '1000',
            department: faker.random.arrayElement(departments)
          };
        }
      });
    }
  }
});

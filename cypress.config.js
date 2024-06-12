const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1000,
    viewportWidth: 1400,
    setupNodeEvents(on, config) {
      on('task', {
        generateEmployee() {
          const randomIndex = Math.floor(Math.random() * 60);
          const employee = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: randomIndex,
            salary: randomIndex * 1000,
            department: faker.lorem.word()
          };

          return employee;
        }
      });
    }
  }
});

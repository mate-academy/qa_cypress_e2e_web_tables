const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: ('https://demoqa.com/webtables'),
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          randomAge = Math.floor(Math.random() * 100);
          randomSalary = Math.floor(Math.random() * 100000);
          
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: randomAge,
            salary: randomSalary,
            department: faker.lorem.word()
          };
        },
      });
    }
  }
});

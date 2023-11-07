const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {     
        generateUser() {
          const email = faker.internet.email();
            return {
              firstName: faker.name.firstName(),
              lastName: faker.name.lastName(),
              age: Math.floor(Math.random(100) * 100),
              salary: Math.floor(Math.random(10000) * 10000),
              email: email.toLowerCase(),
              department: faker.lorem.word()
          };
      }}); 
    }
  }
});

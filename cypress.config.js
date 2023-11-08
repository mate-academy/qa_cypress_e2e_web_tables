const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on("task", {
        generationUsers(){
            return{
              firstName: faker.name.firstName(),
              lastName: faker.name.lastName(),
              email: faker.internet.email(),
              age: faker.random.number({ min: 18, max: 65 }),
              salary: faker.random.number({ min: 2500, max: 15000 }),
              department: faker.commerce.department(),
            }
        }
        
      })
    }
  }
});

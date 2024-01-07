const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1200,
    viewportWidth:1320,
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on("task", {
        newWorker() {
          randomIndex = Math.floor(Math.random() * 2);         

          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: faker.random.number({ min: 18, max: 65 }),
            salary: faker.random.number({ min: 2000, max: 100000 }),
            department: faker.commerce.department(),

       
      };      
    }
   })
  },
 },
});

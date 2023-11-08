const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1320,
    viewportWidth: 1080,
    setupNodeEvents(on, config) {
       on("task", {
        generateUser() {
           return {
             firstName: faker.name.firstName(),
             lastName: faker.name.lastName(),
             email: faker.internet.email(),
             age: faker.random.number({min:18, max:65}),
             salary: faker.random.number({min:6800, max:25000}),
             department: faker.random.word(),
          };
        }
      });
    }
  }
});

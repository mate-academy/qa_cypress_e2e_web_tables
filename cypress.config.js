const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1000,
    viewportWidth: 1400,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
          generateWorker() {
            const random = Math.random().toString().slice(2, 4);
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const email = faker.internet.email();
            const age = Math.floor(Math.random() * 50) + 20;
            const salary = random * 1000;
            const department = faker.commerce.department();

            return {
              firstName,
              lastName,
              email,
              age,
              salary,
              department
            };
          }
      });
    }
  }
});




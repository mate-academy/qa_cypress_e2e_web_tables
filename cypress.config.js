const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1320,
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          const firstName = faker.name.firstName();
          const lastName = faker.name.lastName();
          const email = `${firstName}@gmail.com`;
          const age = Math.floor(Math.random() * 100);
          const salary = Math.random().toString().slice(2, 7);
          const department = faker.commerce.department();
          return { firstName, lastName, email, age, salary, department };
        }
      });
    }
  }
});

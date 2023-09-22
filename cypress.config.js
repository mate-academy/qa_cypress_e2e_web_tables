const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          const firstName = faker.name.firstName();
          const lastName = faker.name.lastName();
          const email = faker.internet.email();
          const age = faker.random.number({ min: 18, max: 65 });
          const salary = faker.random.number({ min: 30000, max: 100000 });
          const departments = ['IT', 'HR', 'Sales', 'Marketing', 'Finance'];
          const department = faker.random.arrayElement(departments);
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

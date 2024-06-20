const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1320,
    viewportWidth: 1080,
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          const minAge = 18;
          const maxAge = 89;
          const randomAge = Math.floor(Math.random() *
          (maxAge - minAge + 1)) + minAge;
          const minSalary = 1000;
          const maxSalary = 10000;
          const randomSalary = Math.floor(Math.random() *
            (maxSalary - minSalary + 1)) + minSalary;
          const departments = ['Human Resources', 'IT',
            'Accounting and Finance', 'Marketing',
            'Research and Development', 'Production'];
          const randomDepartments = Math.floor(Math.random() * 5);
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: randomAge,
            salary: randomSalary,
            department: departments[randomDepartments]
          };
        }
      });
    }
  }
});

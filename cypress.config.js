const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportHeight: 1200,
    viewportWidth: 1000,
    setupNodeEvents(on, config) {
      on('task', {
        generateWorker() {
          const firstName = faker.person.firstName();
          const lastName = faker.person.lastName();
          const age = Math.floor((Math.random() * 46) + 18);
          const salary = Math.floor((Math.random() * 8000) + 2000);
          const department = faker.person.jobArea();

          const changedFirstName = faker.person.firstName();
          const changedLastName = faker.person.lastName();
          const changedAge = Math.floor((Math.random() * 46) + 18);
          const changedSalary = Math.floor((Math.random() * 8000) + 2000);
          const changedDepartment = faker.person.jobArea();

          return {
            firstName: firstName,
            lastName: lastName,
            email: faker.internet.email({firstName: firstName, lastName: lastName}),
            age: age,
            salary: salary,
            department: department,

            changedFirstName: changedFirstName,
            changedLastName: changedLastName,
            changedEmail: faker.internet.email({firstName: changedFirstName, lastName: changedLastName}),
            changedAge: changedAge,
            changedSalary: changedSalary,
            changedDepartment: changedDepartment,
          }
        },
      });
    },
  },
});

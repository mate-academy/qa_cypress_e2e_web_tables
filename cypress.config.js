const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const row = ['5', '10', '20', '25', '50', '100'];
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            firstName: faker.name.firstName().toLowerCase() + randomNumber,
            lastName: faker.name.lastName().toLowerCase() + randomNumber,
            email: email.toLowerCase(),
            age: faker.number.int({ min: 10, max: 99 }),
            salary: faker.number.int({ min: 100, max: 1000 }),
            department: faker.lorem.word(),
            randomrow: row[Math.floor(Math.random() * row.length)]
          };
        },
        editUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            editfirstName: faker.name.firstName().toLowerCase() + randomNumber,
            editlastName: faker.name.lastName().toLowerCase() + randomNumber,
            editemail: email.toLowerCase(),
            editage: faker.number.int({ min: 10, max: 99 }),
            editsalary: faker.number.int({ min: 100, max: 1000 }),
            editdepartment: faker.lorem.word()
          };
        },
        generateRow() {
          const row = ['5', '10', '20', '25', '50', '100'];
          return {
            randomrow: row[Math.floor(Math.random() * row.length)]
          };
        }
      });
    }
  }
});

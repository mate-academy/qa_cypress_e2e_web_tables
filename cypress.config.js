const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1400,
    viewportWidth: 1620,
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          seleries = ['20000', '25000', '30000', '35000', '40000'];
          seleriesNew = ['20500', '25500', '30500', '35500', '40500'];
          departments = ['QA', 'Frontend', 'UA/UX', 'PM', 'Recruiter'];
          departmentsNew = ['Manager', 'Waiter', 'Smith', 'Musician', 'Builder'];
          randomIndex = Math.floor(Math.random() * 4);

          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            age: Math.floor(18 + Math.random() * 50),
            salary: seleries[randomIndex],
            salaryNew: seleriesNew[randomIndex],
            department: departments[randomIndex],
            departmentNew: departmentsNew[randomIndex]
          }
        }
      })
    }
  }
});

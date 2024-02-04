/* eslint-disable no-undef */
/* eslint-disable quotes */
const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 800,
    viewportWidth: 1320,
    Timeout: 8000,
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          randomIndex = Math.floor(Math.random() * 5);
          randomIndex2 = Math.floor(Math.random() * 9);
          lastNames = ['Unu', 'Timu', 'Kanu', 'Mishu', 'Evan', 'Kirin'];
          salaries = ['1000', '1500', '2000', '2300', '3000', '4000'];
          departments = ['HR', 'Developer', 'QA', 'Design', 'Account', 'Sales'];
          ages = ['18', '25', '30', '35', '40', '45', '50', '55', '60', '65'];
          return {
            firstName: faker.name.firstName(),
            lastName: lastNames[randomIndex],
            email: faker.internet.email(),
            age: ages[randomIndex2],
            salary: salaries[randomIndex],
            department: departments[randomIndex]
          };
        }
      });
    }
  }
});

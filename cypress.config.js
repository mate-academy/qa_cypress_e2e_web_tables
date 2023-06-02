const { defineConfig } = require("cypress");
const faker = require('faker');
const rowsNumber = ['5 rows', '20 rows', '25 rows'];


module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/webtables',
    viewportHeight: 1080,
    viewportWidth: 1980,
    setupNodeEvents(on, config) {
      on("task", {
        generateData(){
          return {
            rows: faker.random.arrayElement(rowsNumber),
          }
        }
      })
    },
  },
});

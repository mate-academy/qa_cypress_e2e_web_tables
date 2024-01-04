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
          const ages = ['18', '19', '20', '21', '22', '23', '24', '25',
            '26', '27', '28', '29',
            '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
            '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
            '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',
            '60', '61', '62', '63', '64', '65', '66', '67', '68', '69',
            '70', '71', '72', '73', '74', '75', '76', '77', '78', '79',
            '80', '81', '82', '83', '84', '85', '86', '87', '88', '89'];
          const randomAge = Math.floor(Math.random() * 71);
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
            age: ages[randomAge],
            salary: randomSalary,
            department: departments[randomDepartments]
          };
        }
      });
    }
  }
});

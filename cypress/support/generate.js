const faker = require('faker');

function generateUser() {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  const email = faker.internet.email();
  const age = Math.floor(Math.random(100) * 100);
  const salary = Math.floor(Math.random(1000) * 1000);
  const department = 'testDepartment';

  cy.findId('addNewRecordButton').click();
  cy.findId('firstName').type(firstname);
  cy.findId('lastName').type(lastname);
  cy.findId('userEmail').type(email);
  cy.findId('age').type(age);
  cy.findId('salary').type(salary);
  cy.findId('department').type(department);
  cy.findId('submit').click();

  return {
    firstname,
    lastname,
    email,
    age,
    salary,
    department
  };
};

module.exports = { generateUser };

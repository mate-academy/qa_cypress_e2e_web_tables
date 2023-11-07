// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const faker = require('faker');

Cypress.Commands.add('addUser', () => {  
  let user;

  user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: Math.floor(Math.random(100) * 100),
    salary: Math.floor(Math.random(10000) * 10000),
    email: faker.internet.email(),
    department: faker.lorem.word()
  };

  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(user.firstName);
  cy.get('#lastName').type(user.lastName);
  cy.get('#userEmail').type(user.email);
  cy.get('#age').type(user.age);
  cy.get('#salary').type(user.salary);
  cy.get('#department').type(user.department);
  cy.get('#submit').click()
  
}); 



Cypress.Commands.add('addTenUsers', () => {
  cy.addUser();
  cy.addUser(); 
  cy.addUser(); 
  cy.addUser(); 
  cy.addUser(); 
  cy.addUser(); 
  cy.addUser(); 
  cy.addUser(); 
  cy.addUser(); 
  cy.addUser();  
})
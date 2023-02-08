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

Cypress.Commands.add('createUsers', (firstname, lastname, email, age, salary, department) => {
  for (let i = 1; i <= 10; i++) {
    cy.get('#addNewRecordButton')
      .click();
    
    cy.get('[placeholder="First Name"]')
      .type(firstname);

    cy.get('[placeholder="Last Name"]')
      .type(lastname);

    cy.get('[placeholder="name@example.com"]')
      .type(email);
    
    cy.get('[placeholder="Age"]')
      .type(age);
    
    cy.get('[placeholder="Salary"]')
      .type(salary);
    
    cy.get('[placeholder="Department"]')
      .type(department);
      
    cy.contains('button', 'Submit')
      .click();
  }
});

Cypress.Commands.add("createUser", (firstname, lastname, email, age, salary, department) => {
  cy.get("#addNewRecordButton")
    .click();

  cy.get('[placeholder="First Name"]')
    .type(firstname);

  cy.get('[placeholder="Last Name"]')
    .type(lastname);

  cy.get('[placeholder="name@example.com"]')
    .type(email);

  cy.get('[placeholder="Age"]')
    .type(age);

  cy.get('[placeholder="Salary"]')
    .type(salary);

  cy.get('[placeholder="Department"]')
    .type(department);

  cy.contains("button", "Submit")
    .click();
});
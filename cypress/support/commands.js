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
Cypress.Commands.add('addWorker',
  (name, lastName, email, age, salary, department) => {
    cy.get('[id="addNewRecordButton"]').click();
    cy.get('[placeholder="First Name"]').type('Kolya');
    cy.get('[placeholder="Last Name"]').type('Batkovich');
    cy.get('[placeholder="name@example.com"]')
      .type('Batkovich@gmail.com');
    cy.get('[placeholder="Age"]').type('35');
    cy.get('[id="salary-wrapper"]').type('5000');
    cy.get('[placeholder="Department"]').type('Lead of QA Department');
    cy.get('[id="submit"]').click();
  });

Cypress.Commands.add('AddAssertions', () => {
  cy.get('[class="rt-table"]').should('exist');
  cy.get('[class="rt-table"]').should('contain', 'Kolya');
  cy.get('[class="rt-table"]').should('contain', 'Batkovich');
  cy.get('[class="rt-table"]').should('contain', 'Batkovich@gmail.com');
  cy.get('[class="rt-table"]').should('contain', '35');
  cy.get('[class="rt-table"]').should('contain', '5000');
  cy.get('[class="rt-table"]').should('contain', 'Lead of QA Department');
});

Cypress.Commands.add('DeleteAssertions', () => {
  cy.get('[id = "delete-record-4"]').should('exist');
  cy.get('[id = "delete-record-4"]').click();
  cy.get('[class="rt-table"]').should('not.contain', 'Kolya');
  cy.get('[class="rt-table"]').should('not.contain', 'Batkovich');
  cy.get('[class="rt-table"]').should('not.contain', 'Batkovich@gmail.com');
  cy.get('[class="rt-table"]').should('not.contain', '35');
  cy.get('[class="rt-table"]').should('not.contain', '5000');
  cy.get('[class="rt-table"]').should('not.contain', 'Lead of QA Department');
});

Cypress.Commands.add('ExistAssertions', () => {
  cy.get('[id="edit-record-4"]').click();
  cy.get('[placeholder="First Name"]').should('exist');
  cy.get('[placeholder="Last Name"]').should('exist');
  cy.get('[placeholder="name@example.com"]')
    .should('exist');
  cy.get('[placeholder="Age"]').should('exist');
  cy.get('[id="salary-wrapper"]').should('exist');
  cy.get('[placeholder="Department"]').should('exist');
  cy.get('[id="submit"]').should('exist');
});
Cypress.Commands.add('Edits', () => {
  cy.get('[placeholder="First Name"]').clear();
  cy.get('[placeholder="First Name"]').type('Misha');
  cy.get('[placeholder="Last Name"]').clear();
  cy.get('[placeholder="Last Name"]').type('Halepa');
  cy.get('[placeholder="name@example.com"]')
    .clear();
  cy.get('[placeholder="name@example.com"]')
    .type('Halepa@gmail.com');
  cy.get('[placeholder="Age"]').clear();
  cy.get('[placeholder="Age"]').type('48');
  cy.get('[id="salary-wrapper"]').clear();
  cy.get('[id="salary-wrapper"]').type('1000');
  cy.get('[placeholder="Department"]').clear();
  cy.get('[placeholder="Department"]').clear();
  cy.get('[placeholder="Department"]').type('Intern');
  cy.get('[id="submit"]').click();
  cy.get('[class="rt-table"]').should('exist');
  cy.get('[class="rt-table"]').should('contain', 'Misha');
  cy.get('[class="rt-table"]').should('contain', 'Halepa');
  cy.get('[class="rt-table"]').should('contain', 'Halepa@gmail.com');
  cy.get('[class="rt-table"]').should('contain', '48');
  cy.get('[class="rt-table"]').should('contain', '1000');
  cy.get('[class="rt-table"]').should('contain', 'Inetrn');
});

Cypress.Commands.add('SearchAsserts', () => {
  cy.get('[id="searchBox"]').type('Kolya');
  cy.get('[class="rt-table"]')
    .should('contain', 'Kolya');
  cy.get('[id="searchBox"]').clear();
  cy.get('[id="searchBox"]').type('Batkovich');
  cy.get('[class="rt-table"]')
    .should('contain', 'Batkovich');
  cy.get('[id="searchBox"]').clear();
  cy.get('[id="searchBox"]').type('Batkovich@gmail.com');
  cy.get('[class="rt-table"]')
    .should('contain', 'Batkovich@gmail.com');
  cy.get('[id="searchBox"]').clear();
  cy.get('[id="searchBox"]').type('35');
  cy.get('[class="rt-table"]')
    .should('contain', '35');
  cy.get('[id="searchBox"]').clear();
  cy.get('[id="searchBox"]').type('5000');
  cy.get('[class="rt-table"]')
    .should('contain', '5000');
  cy.get('[id="searchBox"]').clear();
  cy.get('[id="searchBox"]').type('Lead of QA Department');
  cy.get('[class="rt-table"]')
    .should('contain', 'Lead of QA Department');
});

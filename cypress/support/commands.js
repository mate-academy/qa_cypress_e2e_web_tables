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

Cypress.Commands.add('findByClassName', (className) => {
    cy.get(`.${className}`);
})

Cypress.Commands.add('findByProperty', (property, value) => {
    cy.get(`[${property}="${value}"]`);
})

Cypress.Commands.add('findByContent', (node, content) => {
    cy.contains(`${node}`, `${content}`);
})

Cypress.Commands.add('validateWorker', (worker, isLast) => {
    if(isLast) {
        cy.contains('.rt-tr', `${worker.email}`)
          .last()
          .should('contain.text', `${worker.email}`)
          .and('contain.text', `${worker.firstName}`)
          .and('contain.text', `${worker.lastName}`)
          .and('contain.text', `${worker.age}`)
          .and('contain.text', `${worker.salary}`)
          .and('contain.text', `${worker.department}`);
    } else {
        cy.contains('.rt-tr', `${worker.email}`)
          .should('contain.text', `${worker.email}`)
          .and('contain.text', `${worker.firstName}`)
          .and('contain.text', `${worker.lastName}`)
          .and('contain.text', `${worker.age}`)
          .and('contain.text', `${worker.salary}`)
          .and('contain.text', `${worker.department}`);
    }
})

Cypress.Commands.add('validateByValue', (value) => {
    cy.findByProperty('placeholder', 'Type to search')
      .clear()
      .type(value)

    cy.findByClassName('rt-tr')
      .should('contain.text', `${value}`);
})

Cypress.Commands.add('addNewWorker', (worker) => {

    cy.findByProperty('placeholder', 'First Name')
      .clear()
      .type(worker.firstName);

    cy.findByProperty('placeholder', 'Last Name')
      .clear()
      .type(worker.lastName);

    cy.findByProperty('placeholder', 'name@example.com')
      .clear()
      .type(worker.email);

    cy.findByProperty('placeholder', 'Age')
      .clear()
      .type(worker.age);

    cy.findByProperty('placeholder', 'Salary')
      .clear()
      .type(worker.salary);

    cy.findByProperty('placeholder', 'Department')
      .clear()
      .type(worker.department);

    cy.findByContent('button', 'Submit')
      .click();
})
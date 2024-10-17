Cypress.Commands.add('fillInForm', ({ ...args }) => {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(args.firstName);
  cy.get('#lastName').type(args.lastName);
  cy.get('#userEmail').type(args.email);
  cy.get('#age').type(args.age);
  cy.get('#salary').type(args.salary);
  cy.get('#department').type(args.department);
  cy.get('#submit').click();
});

Cypress.Commands.add('searchByValue', (value) => {
  cy.get('#searchBox').type(value);
  cy.get('.rt-td').should('contain.text', value);
});

Cypress.Commands.add('selectRows', (value) => {
  cy.get('[aria-label="rows per page"]').select(value);
});

Cypress.Commands.add('checkTextByClass', (className, text) => {
  cy.get(`.${className}`).should('contain.text', text);
});

Cypress.Commands.add('getBySelector', (selector) => {
  cy.get(selector).click();
});

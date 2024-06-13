Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('create', (user) => {
  cy.get(`#addNewRecordButton`).click();
  cy.findByPlaceholder(`First Name`).type(user.firstname);
  cy.findByPlaceholder(`Last Name`).type(user.lastname);
  cy.findByPlaceholder(`name@example.com`).type(user.email);
  cy.findByPlaceholder(`Age`).type(user.age);
  cy.findByPlaceholder(`Salary`).type(user.salary);
  cy.findByPlaceholder(`Department`).type(user.department);
  cy.get(`#submit`).click();
});

Cypress.Commands.add('findPlaceholder', (placeholder) =>{
  cy.get(`[placeholder="${placeholder}"]`);
});
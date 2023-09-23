Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('findById', (id) => {
  cy.get(`#${id}`);
});

Cypress.Commands.add('checkTextsInContainers', (searchTexts) => {
  cy.get('.rt-tbody').each((row) => {
    searchTexts.forEach((searchText) => {
      cy.wrap(row).should('contain', searchText);
    });
  });
});

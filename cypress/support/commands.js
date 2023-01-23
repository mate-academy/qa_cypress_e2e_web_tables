
Cypress.Commands.add('clickAddWorker', () => {
  cy.get('#addNewRecordButton').click()
});

Cypress.Commands.add('submitWorker', () => {
   cy.get('#submit').click();
});
Cypress.Commands.add('deleteNewWorker', (num) => {
   cy.get(`#delete-record-${num}`).click();
}); 

Cypress.Commands.add('selectRowParPage', (number) => {
  cy.get("select[aria-label='rows per page']").select(number)
});

Cypress.Commands.add('checkNumberOfPage', (number) => {
  cy.get(".-pageJump>input[type='number']").should('have.value',number)
});
Cypress.Commands.add('getSearchBox', () => {
  cy.get('#searchBox').clear()
});
Cypress.Commands.add('clickEdit', () => {
  cy.get('span[title="Edit"]').click();
});









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
Cypress.Commands.add('createWorkers', (user, index)=>{
    for(let i = 1; i <= index; i++){
        cy.get('#addNewRecordButton').click()
        cy.get('#firstName').type(user.firstName)
        cy.get('#lastName').type(user.lastName)
        cy.get('#userEmail').type(user.email)
        cy.get('#age').type(user.age)
        cy.get('#salary').type(user.salary)
        cy.get('#department').type(user.department)
        cy.get('form').submit()
      } 
})

Cypress.Commands.add('verifyRows', (index)=>{
    cy.get('[aria-label="rows per page"]').select(`${index} rows`)
    cy.get('.rt-tbody .rt-tr-group').should('have.length', `${index}`)
})

Cypress.Commands.add('verifyUserCreation', (user)=>{
    cy.get('.rt-tbody .rt-tr-group').should('contain', user.firstName)
    .and('contain', user.lastName)
    .and('contain', user.email)
    .and('contain', user.age)
    .and('contain', user.salary)
    .and('contain', user.department)
})

Cypress.Commands.add('deleteAllWorkers', () => {
    cy.get('.rt-tbody').find('[title="Delete"]').then((arrayOfButtons) => {
      const amountOfButtons = arrayOfButtons.length;
      for (let i = amountOfButtons - 1; i >= 0; i--) {
        cy.get('[title="Delete"]').eq(i).click();
      }
    });
  });

  Cypress.Commands.add('searchbyColumns', (user) =>{
    cy.get('#searchBox').type(user)
    cy.get('.rt-tbody .rt-tr-group').should('contain', user)
    cy.get('#searchBox').clear()
  })

Cypress.Commands.add('createUser', (user) => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
  });

  Cypress.Commands.add('searchBy', (user) => {
    cy.get('#searchBox').clear().type(user.firstName);
    cy.get('#searchBox').clear().type(user.lastName);
    cy.get('#searchBox').clear().type(user.email);
    cy.get('#searchBox').clear().type(user.age);
    cy.get('#searchBox').clear().type(user.salary);
    cy.get('#searchBox').clear().type(user.department);

  });

  Cypress.Commands.add('searchAndValidateWorker', (data) => {
    cy.get('#searchBox').clear().type(`${data}`);
    cy.get('.rt-td').should('contain.text', data);
  });



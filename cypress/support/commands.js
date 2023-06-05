Cypress.Commands.add('createUser', (firstName, lastName, email, age, salary, department) => {
    cy.get('#addNewRecordButton')
      .click();

    cy.get('#firstName')
      .type(firstName);

    cy.get('#lastName')
      .type(lastName);

    cy.get('#userEmail')
      .type(email);

    cy.get('#age')
      .type(age);

    cy.get('#salary')
      .type(salary);

    cy.get('#department')
      .type(department);

    cy.get('#submit')
      .click();
})
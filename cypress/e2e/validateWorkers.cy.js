const { generateWorker } = require('../support/generateWorker');

describe('Add worker and validate data', () => {
  beforeEach(() => {
    cy.visit('/webtables')
  });

  it('should provide ability to add a worker via UI', function() {
    const { firstName, lastName, email, age, salary, department } = generateWorker();

    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(firstName);

    cy.get('#lastName').type(lastName);

    cy.get('#userEmail').type(email);

    cy.get('#age').type(`${age}`);

    cy.get('#salary').type(`${salary}`);

    cy.get('#department').type(department);

    cy.get('#submit').click();
  });

  it('should contain valid worker data after adding', function() {
    const worker = generateWorker();

    cy.addRandomWorker(worker);

    cy.get(':nth-child(4) > .rt-tr > :nth-child(1)')
      .should('contain.text', worker.firstName);

    cy.get(':nth-child(4) > .rt-tr > :nth-child(2)')
      .should('contain.text', worker.lastName);

    cy.get(':nth-child(4) > .rt-tr > :nth-child(3)')
      .should('contain.text', worker.age);

    cy.get(':nth-child(4) > .rt-tr > :nth-child(4)')
      .should('contain.text', worker.email);

    cy.get(':nth-child(4) > .rt-tr > :nth-child(5)')
      .should('contain.text', worker.salary);

    cy.get(':nth-child(4) > .rt-tr > :nth-child(6)')
      .should('contain.text', worker.department);
  });
});

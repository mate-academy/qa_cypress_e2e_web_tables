/// <reference types='cypress' />

const { generateFakeUser } = require('../support/fakeUser');

/*
Your task is to check the following points:

1. Rows count selection.
2. Add a new worker.
3. Delete a worker.
4. Find a worker in the search field and edit it.
5. Validate data in the worker row after editing the worker.
6. Check the search by all column values.
7. Pagination.
8. Delete all workers.
*/

describe('Web Tables page', () => {
  let fakeUser1;
  let fakeUser2;
  let fakeUser3;
  let fakeUser4;

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
    fakeUser1 = generateFakeUser();
    fakeUser2 = generateFakeUser();
    fakeUser3 = generateFakeUser();
    fakeUser4 = generateFakeUser();
  });

  it('Check rows count selection', () => {
    cy.get('select').should('exist');
    cy.get('select').select('5');
    cy.get(':nth-child(5) > .rt-tr > :nth-child(1)').should('be.visible');
    cy.get(':nth-child(6) > .rt-tr > :nth-child(1)').should('not.exist');
  });

  it('Add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(fakeUser1.firstName);
    cy.get('#lastName').type(fakeUser1.lastName);
    cy.get('#userEmail').type(fakeUser1.email);
    cy.get('#age').type(fakeUser1.age);
    cy.get('#salary').type(fakeUser1.salary);
    cy.get('#department').type(fakeUser1.department);
    cy.get('#submit').click();
    cy.get(':nth-child(4) > .rt-tr > :nth-child(1)').should('contain', `${fakeUser1.firstName}`);

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(fakeUser2.firstName);
    cy.get('#lastName').type(fakeUser2.lastName);
    cy.get('#userEmail').type(fakeUser2.email);
    cy.get('#age').type(fakeUser2.age);
    cy.get('#salary').type(fakeUser2.salary);
    cy.get('#department').type(fakeUser2.department);
    cy.get('#submit').click();
    cy.get(':nth-child(5) > .rt-tr > :nth-child(1)').should('contain', `${fakeUser2.firstName}`);

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(fakeUser3.firstName);
    cy.get('#lastName').type(fakeUser3.lastName);
    cy.get('#userEmail').type(fakeUser3.email);
    cy.get('#age').type(fakeUser3.age);
    cy.get('#salary').type(fakeUser3.salary);
    cy.get('#department').type(fakeUser3.department);
    cy.get('#submit').click();
    cy.get(':nth-child(6) > .rt-tr > :nth-child(1)').should('contain', `${fakeUser3.firstName}`);

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(fakeUser4.firstName);
    cy.get('#lastName').type(fakeUser4.lastName);
    cy.get('#userEmail').type(fakeUser4.email);
    cy.get('#age').type(fakeUser4.age);
    cy.get('#salary').type(fakeUser4.salary);
    cy.get('#department').type(fakeUser4.department);
    cy.get('#submit').click();
    cy.get(':nth-child(7) > .rt-tr > :nth-child(1)').should('contain', `${fakeUser4.firstName}`);
  });

  it('Delete a worker', () => {
    cy.get('#delete-record-1 > svg').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('not.contain', 'Cierra');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .should('not.contain', 'Vega');
  });

  it('Finds and edits a worker, check the data after editing', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('contain', 'Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#firstName').clear().type('Anastasiia');
    cy.get('#lastName').clear().type('Holland');
    cy.get('#userEmail').clear().type('tomholland@gmail.com');
    cy.get('#submit').click();
    cy.get('#searchBox').clear();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('contain', 'Anastasiia');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .should('contain', 'Holland');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(4)')
      .should('contain', 'tomholland@gmail.com');
  });

  it('Checks search by all column values', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('contain', 'Alden');
    cy.get('#searchBox').clear().type('Gentry');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .should('contain', 'Gentry');
    cy.get('#searchBox').clear().type('39');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(3)')
      .should('contain', '39');
    cy.get('#searchBox').clear().type('cierra@example.com');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(4)')
      .should('contain', 'cierra@example.com');
    cy.get('#searchBox').clear().type('2000');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(5)')
      .should('contain', '2000');
    cy.get('#searchBox').clear().type('Compliance');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(6)')
      .should('contain', 'Compliance');
  });

  it('Checking pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.get('.-center').should('exist');
    cy.get('.-previous > .-btn').should('exist');
    cy.get('.-next > .-btn').should('exist');
    cy.get('.-pageJump').should('exist');
  });

  it('Deletes all workers', () => {
    cy.get('#delete-record-1 > svg').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('not.contain.text', 'Cierra');
    cy.get('#delete-record-2 > svg').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('not.contain.text', 'Alden');
    cy.get('#delete-record-3 > svg').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('not.contain.text', 'Kierra');
  });
});

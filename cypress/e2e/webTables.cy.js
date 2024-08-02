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

  const workers = [
    {
      firstName: 'Cierra',
      lastName: 'Vega',
      age: 39,
      email: 'cierra@example.com',
      salary: 10000,
      department: 'Insurance'
    },
    {
      firstName: 'Alden',
      lastName: 'Cantrell',
      age: 45,
      email: 'alden@example.com',
      salary: 12000,
      department: 'Compliance'
    },
    {
      firstName: 'Kierra',
      lastName: 'Gentry',
      age: 29,
      email: 'kierra@example.com',
      salary: 2000,
      department: 'Legal'
    }
  ];

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
    fakeUser1 = generateFakeUser();
  });

  it('Check rows count selection', () => {
    cy.get('select').should('exist');
    cy.get('select').select('5');
    cy.get('.rt-tbody .rt-tr-group').should('have.length', 5);
    cy.get('.rt-tbody .rt-tr-group').eq(5).should('not.exist');
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
  });

  it('Delete a worker', () => {
    cy.get('#delete-record-1 > svg').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('not.contain', workers[0].firstName);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .should('not.contain', workers[0].lastName);
  });

  it('Finds and edits a worker, check the data after editing', () => {
    cy.get('#searchBox').type(workers[0].firstName);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('contain', workers[0].firstName);
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
    cy.get('#searchBox').type(workers[1].firstName);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('contain', workers[1].firstName);
    cy.get('#searchBox').clear().type(workers[2].lastName);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .should('contain', workers[2].lastName);
    cy.get('#searchBox').clear().type(workers[0].age);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(3)')
      .should('contain', workers[0].age);
    cy.get('#searchBox').clear().type(workers[0].email);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(4)')
      .should('contain', workers[0].email);
    cy.get('#searchBox').clear().type(workers[2].salary);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(5)')
      .should('contain', workers[2].salary);
    cy.get('#searchBox').clear().type(workers[1].department);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(6)')
      .should('contain', workers[1].department);
  });

  it('Checking pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.get('.-center').should('exist');
    cy.get('.-previous > .-btn').should('exist');
    cy.get('.-next > .-btn').should('exist');
    cy.get('.-pageJump').should('exist');

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(fakeUser1.firstName);
    cy.get('#lastName').type(fakeUser1.lastName);
    cy.get('#userEmail').type(fakeUser1.email);
    cy.get('#age').type(fakeUser1.age);
    cy.get('#salary').type(fakeUser1.salary);
    cy.get('#department').type(fakeUser1.department);
    cy.get('#submit').click();

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(fakeUser1.firstName);
    cy.get('#lastName').type(fakeUser1.lastName);
    cy.get('#userEmail').type(fakeUser1.email);
    cy.get('#age').type(fakeUser1.age);
    cy.get('#salary').type(fakeUser1.salary);
    cy.get('#department').type(fakeUser1.department);
    cy.get('#submit').click();

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(fakeUser1.firstName);
    cy.get('#lastName').type(fakeUser1.lastName);
    cy.get('#userEmail').type(fakeUser1.email);
    cy.get('#age').type(fakeUser1.age);
    cy.get('#salary').type(fakeUser1.salary);
    cy.get('#department').type(fakeUser1.department);
    cy.get('#submit').click();

    cy.get('select').should('exist');
    cy.get('select').select('5');
    cy.get('.rt-tbody .rt-tr-group').should('have.length', 5);

    cy.get('.-next > .-btn').click();
    cy.get('.-pageJump > input').should('have.value', '2');
    cy.get('.-previous > .-btn').click();
    cy.get('.-pageJump > input').should('have.value', '1');
  });

  it('Deletes all workers', () => {
    cy.get('#delete-record-1 > svg').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('not.contain.text', workers[0].firstName);
    cy.get('#delete-record-2 > svg').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('not.contain.text', workers[1].firstName);
    cy.get('#delete-record-3 > svg').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('not.contain.text', workers[2].firstName);
  });
});

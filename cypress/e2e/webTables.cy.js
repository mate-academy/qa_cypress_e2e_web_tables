/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });
  it('should contain pagination', () => {
    cy.visit('https://demoqa.com/webtables');

    cy.get('.-previous').should('contain', 'Previous');
  });

  it('should contain rows count selection', () => {
    cy.get('select[aria-label="rows per page"]').select('10');
    cy.get('.rt-tr-group').should('have.length', 10);
  });

  it('should allow to add new worker and delete him', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type(user.firstName);
    cy.get('[placeholder="Last Name"]').type(user.lastName);
    cy.get('[placeholder="name@example.com"]').type(user.email);
    cy.get('[placeholder="Age"]').type(user.age);
    cy.get('[placeholder="Salary"]').type(user.salary);
    cy.get('[placeholder="Department"]').type(user.department);
    cy.get('#submit').click();
    // eslint-disable-next-line max-len
    cy.get('.rt-tbody').should('contain', user.firstName).and('contain', user.lastName);
    cy.get('#delete-record-4').click({ force: true });
    cy.get('.rt-tbody').should('not.contain', user.firstName).and('not.contain', user.lastName);
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-3').click({ force: true });
    cy.get('#delete-record-2').click({ force: true });
    cy.get('#delete-record-1').click({ force: true });
    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it('should allow to find a worker in the search field and edit it and validate changes', () => {
    cy.get('[placeholder="Type to search"]').type('Alden');
    cy.get('[title="Edit"]').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type('Alex');
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', 'Alex');
  });

  it.only('should check the search by all column values', () => {
    cy.get('[placeholder="Type to search"]').type('Kierra');
    cy.get('.rt-td').should('contain', 'Kierra');
    cy.get('[placeholder="Type to search"]').clear();

    cy.get('[placeholder="Type to search"]').type('Gentry');
    cy.get('.rt-td').should('contain', 'Gentry');
    cy.get('[placeholder="Type to search"]').clear();

    cy.get('[placeholder="Type to search"]').type('29');
    cy.get('.rt-td').should('contain', '29');
    cy.get('[placeholder="Type to search"]').clear();

    cy.get('[placeholder="Type to search"]').type('kierra@example.com');
    cy.get('.rt-td').should('contain', 'kierra@example.com');
    cy.get('[placeholder="Type to search"]').clear();

    cy.get('[placeholder="Type to search"]').type('2000');
    cy.get('.rt-td').should('contain', '2000');
    cy.get('[placeholder="Type to search"]').clear();

    cy.get('[placeholder="Type to search"]').type('Legal');
    cy.get('.rt-td').should('contain', 'Legal');
    cy.get('[placeholder="Type to search"]').clear();
    });
  });

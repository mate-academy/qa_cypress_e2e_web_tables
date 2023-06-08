/// <reference types="cypress" />

describe('Web Tables page', () => {
  const worker = {
    firstName: 'Artqm',
    lastName: 'k',
    email: 'artq@test.qa',
    age: 23,
    salary: 17000,
    department: 'PR'
  };

  const changedWorker = {
    firstName: 'Misha',
    lastName: 'b',
    email: 'volkok@test.qa',
    age: 64,
    salary: 50000,
    department: 'Defence',
  };

  beforeEach(() => {
    cy.visit('/')
  });

  it('should have pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .and('contain', 'Next');
    cy.contains('.-pageInfo', 'Page')
      .should('exist');
  });

  it('should have rows count selection', () => {
    cy.get('select')
      .select('5 rows');
    cy.get('select')
      .should('contain', '5 rows');
  });

  it('should add new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();

    cy.get('.rt-tbody')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('delete a worker', () => {
    cy.get(`#delete-record-1`).click();
    cy.get('.rt-tbody').should('not.contain.html', `#delete-record-1`)
  });

  it('delete all workers', () => {
    for (let i = 1; i < 4; i++) {cy.get(`#delete-record-${i}`).click()}
    cy.get('[id^="delete-record-"]').should('not.exist');
  });

  it('should allow to find a user from the Search field and edit his records', () => {
    cy.get('#searchBox')
      .type('Alden');

    cy.get('#basic-addon2').click();

    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('contain', 'Alden');

    cy.get('#edit-record-2')
      .click();

    cy.get('#firstName')
      .type('_edited');

    cy.get('#submit')
      .should('exist')
      .click();

    cy.get('[role="row"]')
      .should('contain', 'Alden_edited');
  });

  it('should search by all column values', () => {
    cy.createWorker(worker);
    cy.get('#searchBox').clear().type(worker.firstName);
    cy.get('.rt-tbody').should('contain', worker.firstName);

    cy.get('#searchBox').clear().type(worker.lastName);
    cy.get('.rt-tbody').should('contain', worker.lastName);

    cy.get('#searchBox').clear().type(worker.email);
    cy.get('.rt-tbody').should('contain', worker.email);

    cy.get('#searchBox').clear().type(worker.age);
    cy.get('.rt-tbody').should('contain', worker.age);

    cy.get('#searchBox').clear().type(worker.salary);
    cy.get('.rt-tbody').should('contain', worker.salary);

    cy.get('#searchBox').clear().type(worker.department);
    cy.get('.rt-tbody').should('contain', worker.department);
  });
});
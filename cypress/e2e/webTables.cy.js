/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateWorker').then((generateWorker) => {
      worker = generateWorker;
    });
  });

  it('Should check pagination', () => {
    cy.get('.pagination-bottom').should('exist');
    cy.get('.select-wrap').click();
  });
  it('Should check Rows count selection', () => {
    cy.get('[aria-label="rows per page"]').should('have.value', '10');
    cy.get('[aria-label="rows per page"]').select('20');
    cy.get('[aria-label="rows per page"]').should('have.value', '20');
  });
  it('Should Add a new worker.', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type(worker.firstName);
    cy.get('[placeholder="Last Name"]').type(worker.lastName);
    cy.get('[placeholder="name@example.com"]').type(worker.email);
    cy.get('[placeholder="Age"]').type(worker.age);
    cy.get('[placeholder="Salary"]').type(worker.salary);
    cy.get('[placeholder="Department"]').type(worker.department);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });
  it('Should Delete a worker.', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type(worker.firstName);
    cy.get('[placeholder="Last Name"]').type(worker.lastName);
    cy.get('[placeholder="name@example.com"]').type(worker.email);
    cy.get('[placeholder="Age"]').type(worker.age);
    cy.get('[placeholder="Salary"]').type(worker.salary);
    cy.get('[placeholder="Department"]').type(worker.department);
    cy.get('#submit').click();
    cy.get('.ReactTable')
      .should('contain', worker.firstName)
      .within(() => {
        cy.get('#delete-record-4').click();
      });
    cy.get('.ReactTable').should('not.contain', worker.firstName);
  });
  it('Should provide an ability to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();

    cy.get('.ReactTable').should('contain', 'No rows found');
  });
  it('Find a worker in the search field and edit it.', () => {
    cy.get('[placeholder="Type to search"]').type('Cierra');
    cy.get('.mr-2').click();
    cy.get('[placeholder="Last Name"]').clear();
    cy.get('[placeholder="Last Name"]').type(worker.lastName);
    cy.get('#submit').click();
  });
  it('Validate data in the worker row after editing the worker.', () => {
    cy.get('[placeholder="Type to search"]').type('Cierra');
    cy.get('.mr-2').click();
    cy.get('[placeholder="First Name"]').clear();
    cy.get('[placeholder="First Name"]').type(worker.firstName);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', worker.firstName);
  });
  it('Should search by all column values.', () => {
    cy.get('[placeholder="Type to search"]').type('Cierra');
    cy.get('.ReactTable').should('contain', 'Cierra');
    cy.get('#searchBox').clear();
    cy.get('[placeholder="Type to search"]').type('Cantrell');
    cy.get('.ReactTable').should('contain', 'Cantrell');
    cy.get('#searchBox').clear();
    cy.get('[placeholder="Type to search"]').type('39');
    cy.get('.ReactTable').should('contain', '39');
    cy.get('#searchBox').clear();
    cy.get('[placeholder="Type to search"]').type('alden@example.com');
    cy.get('.ReactTable').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();
    cy.get('[placeholder="Type to search"]').type('12000');
    cy.get('.ReactTable').should('contain', '12000');
    cy.get('#searchBox').clear();
    cy.get('[placeholder="Type to search"]').type('Legal');
    cy.get('.ReactTable').should('contain', 'Legal');
    cy.get('#searchBox').clear();
  });
});

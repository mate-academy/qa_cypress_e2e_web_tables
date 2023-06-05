/// <reference types="cypress" />

describe('Web Tables page', () => {
  function deleteAllFoundWorkers(rawCount) {
    if (rawCount < 1) return; // if no rows remain, terminate recursion
    cy.get('[id^="delete-record"]', { timeout: 10000 })
      .first()
      .click()
      .then(() => {
        deleteAllFoundWorkers(--rawCount); // try again
      });
  }
  
  const searchData = {
    firstName: 'Cierra',
    lastName: 'Vega',
    age: '39',
    email: 'cierra@example.com',
    salary: '10000',
    department: 'Insurance',
  };

  const testData = {
    newWorker: {
      firstName: 'Anton',
      lastName: 'Kalnohuz',
      email: 'akalnohuz@example.com',
      age: '25',
      salary: '50000',
      department: 'IT'
    }
  };

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('pagination should be present', () => {
    cy.get('.-pagination').should('exist');
  });

  it('rows count selection should be present and working', () => {
    cy.get('.select-wrap.-pageSizeOptions').should('exist');
    cy.get('.select-wrap.-pageSizeOptions').click();
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.contains('[aria-label="rows per page"]', '5 rows');
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(testData.newWorker.firstName);
    cy.get('#lastName').type(testData.newWorker.lastName);
    cy.get('#userEmail').type(testData.newWorker.email);
    cy.get('#age').type(testData.newWorker.age);
    cy.get('#salary').type(testData.newWorker.salary);
    cy.get('#department').type(testData.newWorker.department);

    cy.contains('button', 'Submit').click();
  });

  it("Should be possible to delete all workers", () => {
    cy.visit("https://demoqa.com/webtables");
    cy.get('[id ^= "delete-record"]').then((rows) =>
      deleteAllFoundWorkers(rows.length)
    );
    // Assert that table is empty
    cy.contains("No rows found").should("be.visible");
  });



  it('should find and edit a worker', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#firstName').clear().type(testData.newWorker.firstName);
    cy.get('#lastName').clear().type(testData.newWorker.lastName);
    cy.get('#userEmail').clear().type(testData.newWorker.email);
    cy.get('#age').clear().type(testData.newWorker.age);
    cy.get('#salary').clear().type(testData.newWorker.salary);
    cy.get('#department').clear().type(testData.newWorker.department);
    cy.contains('button', 'Submit').click();

    // Assert that the worker's information is updated in the table 
    cy.get('#searchBox').clear().type(testData.newWorker.firstName);
    cy.contains('.rt-td', testData.newWorker.firstName).should('exist');

  });


  it('should validate data in worker row after creating worker', () => {
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(testData.newWorker.firstName);
    cy.get('#lastName').type(testData.newWorker.lastName);
    cy.get('#userEmail').type(testData.newWorker.email);
    cy.get('#age').type(testData.newWorker.age);
    cy.get('#salary').type(testData.newWorker.salary);
    cy.get('#department').type(testData.newWorker.department);
    cy.contains('button', 'Submit').click();
    cy.get('#searchBox').clear().type(testData.newWorker.firstName);
    cy.contains('.rt-tr-group', testData.newWorker.firstName).should('exist');
    cy.contains('.rt-tr-group', testData.newWorker.lastName).should('exist');
    cy.contains('.rt-tr-group', testData.newWorker.email).should('exist');
    cy.contains('.rt-tr-group', testData.newWorker.age).should('exist');
    cy.contains('.rt-tr-group', testData.newWorker.salary).should('exist');
    cy.contains('.rt-tr-group', testData.newWorker.department).should('exist');

  
  });

  it('should provide an ability to search by all column values', () => {
    cy.get('#searchBox').type(searchData.firstName);
    cy.get('.rt-tr-group').should('contain', searchData.firstName);
    cy.get('#searchBox').type('{selectAll}' + searchData.lastName);
    cy.get('.rt-tr-group').should('contain', searchData.lastName);
    cy.get('#searchBox').type('{selectAll}' + searchData.age);
    cy.get('.rt-tr-group').should('contain', searchData.age);
    cy.get('#searchBox').type('{selectAll}' + searchData.email);
    cy.get('.rt-tr-group').should('contain', searchData.email);
    cy.get('#searchBox').type('{selectAll}' + searchData.salary);
    cy.get('.rt-tr-group').should('contain', searchData.salary);
    cy.get('#searchBox').type('{selectAll}' + searchData.department);
    cy.get('.rt-tr-group').should('contain', searchData.department);
  });
});

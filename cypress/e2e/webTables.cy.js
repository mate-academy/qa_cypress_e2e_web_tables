/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.task('generateWorker').then(generateWorker => {
      worker = generateWorker;
    });

    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  function addNewWorker(n) {
    for (let i = 0; i < n; i++) {
      cy.get('.btn#addNewRecordButton').contains('Add').click();
      cy.findByPlaceholder('First Name').type(worker.firstName);
      cy.findByPlaceholder('Last Name').type(worker.lastName);
      cy.findByPlaceholder('name@example.com').type(worker.email);
      cy.findByPlaceholder('Age').type(worker.age);
      cy.findByPlaceholder('Salary').type(worker.salary);
      cy.findByPlaceholder('Department').type(worker.department);
      cy.get('.btn').contains('Submit').click();
    }
  }

  it('Rows count selection', () => {
    cy.get('.rt-tr-group').should('have.length', 10);
    cy.get('select').select('5');
    cy.get('.rt-tr-group').should('have.length', 5);
  });

  it('pagination', () => {
    cy.get('select').select('5');
    cy.get('.-btn:contains("Next")').should('have.attr', 'disabled');
    cy.get('.-totalPages').should('have.text', '1');
    addNewWorker(3);
    cy.get('.-totalPages').should('have.text', '2');
  });

  it('should provide ability to Add new worker', () => {
    addNewWorker(1);
  });

  it('Validate data in worker row after creating worker', () => {
    addNewWorker(1);
    cy.get('.rt-tbody').should('contain', worker.firstName);
    cy.get('.rt-tbody').should('contain', worker.lastName);
    cy.get('.rt-tbody').should('contain', worker.email);
    cy.get('.rt-tbody').should('contain', worker.age);
    cy.get('.rt-tbody').should('contain', worker.salary);
    cy.get('.rt-tbody').should('contain', worker.department);
  });

  it('should provide ability to Delete worker', () => {
    cy.get('[title="Delete"]').eq(0).click();
  });

  it('should provide ability to Delete ALL workers', () => {
    function deleteAllElements() {
      cy.get('[title="Delete"]').should('exist');
      let deletedCount = 0;

      while (deletedCount < 3) {
        cy.get('[title="Delete"]').first().click();
        cy.get('[title="Delete"]').should('exist');
        deletedCount++;
      }
    }
    deleteAllElements();
  });

  it('should provide ability to Find worker in search field and Edit', () => {
    addNewWorker(1);

    cy.findByPlaceholder('Type to search').type(worker.lastName);
    cy.get('[title="Edit"]').eq(0).click();
    cy.findByPlaceholder('First Name').type(' PETROVICH');
    cy.findByPlaceholder('Last Name').clear().type(worker.lastName);
    cy.findByPlaceholder('name@example.com').clear().type(worker.email);
    cy.findByPlaceholder('Age').invoke('val').then((currentAge) => {
      const currentAgeNumber = parseInt(currentAge);
      const newAge = currentAgeNumber + 5;

      cy.findByPlaceholder('Age').clear().type(`${newAge}`);
    });
    cy.findByPlaceholder('Salary').invoke('val').then((currentSalary) => {
      const currentSalaryNumber = parseInt(currentSalary);
      const newSalary = currentSalaryNumber + 1000;

      cy.findByPlaceholder('Salary').clear().type(`${newSalary}`);
    });
    cy.findByPlaceholder('Department').clear().type(worker.department);
    cy.get('.btn').contains('Submit').click();
    cy.get('.rt-tbody').should('contain', 'PETROVICH');
  });

  it('Check search by all column values', () => {
    addNewWorker(1);
    cy.findByPlaceholder('Type to search').type(worker.lastName);
    cy.get('.rt-tbody').should('contain', worker.lastName);
    cy.findByPlaceholder('Type to search').clear().type(worker.firstName);
    cy.get('.rt-tbody').should('contain', worker.firstName);
    cy.findByPlaceholder('Type to search').clear().type(worker.email);
    cy.get('.rt-tbody').should('contain', worker.email);
    cy.findByPlaceholder('Type to search').clear().type(worker.salary);
    cy.get('.rt-tbody').should('contain', worker.salary);
    cy.findByPlaceholder('Type to search').clear().type(worker.department);
    cy.get('.rt-tbody').should('contain', worker.department);
  });
});

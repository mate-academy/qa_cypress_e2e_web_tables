/// <reference types='cypress' />

describe('Web Tables page', () => {
 
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should add a new worker', () => {
   const age = '34';
   const salary = '10000';
   const department = 'trade';
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('Andreu');
    cy.get('#lastName').type('Drew');
    cy.get('[placeholder="name@example.com"]').type('workernew@qateam.com');
    cy.get('#age').type(age);
    cy.get('[placeholder="Salary"]').type(salary);
    cy.get('#department').type(department);
    cy.get('[id="submit"]').click();
    cy.get('.rt-table').should('contain', 'Andreu');
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-3').click();
    cy.get('.rt-td').should('not.contain', 'Kierra');
  });

  it('should find and edit the worker', () => {
    cy.get('[placeholder="Type to search"]').type('Vega');
    cy.get('[id="edit-record-1"]').click();
    cy.get('[placeholder="First Name"]').type('qa');
    cy.get('[id="submit"]').click();
    cy.get('.rt-td').should('contain', 'Cierraqa');
  });

  it('should check the pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');

   const age = '34';
   const salary = '10000';
   const department = 'trade';
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('Andreu');
    cy.get('#lastName').type('Drew');
    cy.get('[placeholder="name@example.com"]').type('workernew@qateam.com');
    cy.get('#age').type(age);
    cy.get('[placeholder="Salary"]').type(salary);
    cy.get('#department').type(department);
    cy.get('[id="submit"]').click();
    cy.get('.rt-table').should('contain', 'Andreu');

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('Malina');
    cy.get('#lastName').type('Drewqq');
    cy.get('[placeholder="name@example.com"]').type('worker123@qateam.com');
    cy.get('#age').type(age);
    cy.get('[placeholder="Salary"]').type(salary);
    cy.get('#department').type(department);
    cy.get('[id="submit"]').click();
    cy.get('.rt-table').should('contain', 'Malina');

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('Alex');
    cy.get('#lastName').type('Port');
    cy.get('[placeholder="name@example.com"]').type('qanew@qateam.com');
    cy.get('#age').type(age);
    cy.get('[placeholder="Salary"]').type(salary);
    cy.get('#department').type(department);
    cy.get('[id="submit"]').click();

    cy.get('[aria-label="rows per page"]').select('5');
    cy.contains('.-btn', 'Next').click();
    cy.get('.-totalPages').should('contain', '2');
    cy.get('[aria-label="jump to page"]').should('have.value', '2');
    cy.get('.rt-table').should('contain', 'Alex');
    cy.get('.-previous').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '1');
    cy.get('.rt-table').should('contain', 'Andreu');
});

  it('should check rows count selection', () => {
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');
    cy.get('select').select('10 rows');
    cy.get('select').should('contain', '10 rows');
    cy.get('select').select('20 rows');
    cy.get('select').should('contain', '20 rows');
    cy.viewport(2560, 1440);
    cy.get('select').select('50 rows');
    cy.get('select').should('contain', '50 rows');
  
  });

  it('should delete all workers', () => {
    const employeesCount = 3;
    for (let i = 0; i < employeesCount; i++) {
      cy.get(`#delete-record-${i + 1}`).click();
    }
    cy.get('.rt-tbody').should('exist');
    cy.get('.rt-noData').should('contain', 'No rows found');
  });
  
  it('should check search by all column values', () => {
    cy.get('[placeholder="Type to search"]').type('Alden');
    cy.get('.rt-tbody').should('contain', 'Alden');
    cy.get('[placeholder="Type to search"]').clear();
    cy.get('[placeholder="Type to search"]').type('Cantrell');
    cy.get('.rt-tbody').should('contain', 'Cantrell');
    cy.get('[placeholder="Type to search"]').clear();
    cy.get('[placeholder="Type to search"]').type('45');
    cy.get('.rt-tbody').should('contain', '45');
    cy.get('[placeholder="Type to search"]').clear();
    cy.get('[placeholder="Type to search"]').type('alden@example.com');
    cy.get('.rt-tbody').should('contain', 'alden@example.com');
    cy.get('[placeholder="Type to search"]').clear();
    cy.get('[placeholder="Type to search"]').type('12000');
    cy.get('.rt-tbody').should('contain', '12000');
    cy.get('[placeholder="Type to search"]').clear();
    cy.get('[placeholder="Type to search"]').type('Compliance');
    cy.get('.rt-tbody').should('contain', 'Compliance');
  });
  });


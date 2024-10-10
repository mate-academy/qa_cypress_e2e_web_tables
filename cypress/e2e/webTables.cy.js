/// <reference types='cypress' />

describe('Web Tables - Pagination Test', () => {
  it('should change the page size and verify the number of rows', () => {
    cy.visit('https://demoqa.com/webtables');

    cy.get('select[aria-label="rows per page"]').select('20');

    cy.get('.rt-tbody .rt-tr-group').should('have.length', 20);

    cy.get('select[aria-label="rows per page"]').select('50');

    cy.get('.rt-tbody .rt-tr-group').should('have.length', 50);

    cy.get('select[aria-label="rows per page"]').select('100');

    cy.get('.rt-tbody .rt-tr-group').should('have.length', 100);
  });
});




describe('Web Tables - Rows Count Selection', () => {
  it('should change the number of displayed rows', () => {
    cy.visit('https://demoqa.com/webtables');

    cy.get('select[aria-label="rows per page"]').select('10');

    cy.get('.rt-tbody .rt-tr-group').should('have.length', 10);
  });

});
describe('Web Tables - Add New Worker', () => {
  it('should add a new worker successfully', () => {
    cy.visit('https://demoqa.com/webtables');

    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#userEmail').type('john.doe@example.com');
    cy.get('#age').type('30');
    cy.get('#salary').type('50000');
    cy.get('#department').type('Engineering');

    cy.get('#submit').click();

    cy.get('.rt-tbody').should('contain.text', 'John');
    cy.get('.rt-tbody').should('contain.text', 'Doe');
  });
});
describe('Web Tables - Delete Worker', () => {
  it('should delete a worker successfully', () => {
    cy.visit('https://demoqa.com/webtables');

    cy.contains('.rt-tr-group', 'Cierra').within(() => {
      cy.get('[title="Delete"]').click();
    });

    cy.get('.rt-tbody').should('not.contain.text', 'Cierra');
  });
});

describe('Web Tables - Search and Edit Worker', () => {
  it('should search and edit a worker', () => {
    cy.visit('https://demoqa.com/webtables');

    cy.get('#searchBox').type('Alden');

    cy.contains('.rt-tr-group', 'Alden').within(() => {
      cy.get('[title="Edit"]').click();
    });

    cy.get('#age').clear().type('45');
    cy.get('#salary').clear().type('60000');

    cy.get('#submit').click();

    cy.contains('.rt-tr-group', 'Alden').within(() => {
      cy.get('.rt-td').eq(2).should('contain.text', '45');
      cy.get('.rt-td').eq(4).should('contain.text', '60000');
    });
  });
});

describe('Web Tables  - Search by All Columns', () => {
  it('should search by different column values', () => {
    cy.visit('https://demoqa.com/webtables');

    cy.get('#searchBox').clear().type('Cierra');
    cy.get('.rt-tbody').should('contain.text', 'Cierra');

    cy.get('#searchBox').clear().type('kierra@example.com');
    cy.get('.rt-tbody').should('contain.text', 'kierra@example.com');

    cy.get('#searchBox').clear().type('Legal');
    cy.get('.rt-tbody').should('contain.text', 'Legal');
  });
});


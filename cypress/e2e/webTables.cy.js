/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables')
  })
  it('should have the pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.get('.-pagination').should('contain.text', 'Previous');
    cy.get('.-pagination').should('contain.text', 'Page');
    cy.get('.-pagination').should('contain.text', 'Next');
  });
  it('should have Rows count selection', () => {
    cy.get('[aria-label ="rows per page"]').should('exist')
    cy.get('[aria-label ="rows per page"]').select('5 rows')
    cy.get('[aria-label ="rows per page"]').select('10 rows')
    cy.get('[aria-label ="rows per page"]').select('20 rows')
    cy.get('[aria-label ="rows per page"]').select('25 rows')
  })
  it('should have Add new worker', () => {
    cy.get('#addNewRecordButton').click()
    cy.get('#firstName').type('Name')
    cy.get('#lastName').type('LastName')
    cy.get('#userEmail').type('text@text.com')
    cy.get('#age').type('18')
    cy.get('#salary').type('111')
    cy.get('#department').type('Qa Enginer')
    cy.get('#submit').click()
  })
  it('should have deleted worker by Delete button', () => {
    cy.get('#delete-record-1').click()
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1')
  })
  it('should have deleted workers by Delete buttons', () => {
    cy.get('#delete-record-1').click()
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1')
    cy.get('#delete-record-2').click()
    cy.get('.rt-tbody').should('not.contain', '#delete-record-2')
    cy.get('#delete-record-3').click()
    cy.get('.rt-tbody').should('not.contain', '#delete-record-3')
  })
  it('should find worker in search field and edit it', () => {
    cy.get('#searchBox').type('Cierra')
    cy.get('#edit-record-1').click()
    cy.get('#firstName').clear()
    cy.get('#lastName').clear()
    cy.get('#userEmail').clear()
    cy.get('#age').clear()
    cy.get('#salary').clear()
    cy.get('#department').clear()
    cy.get('#firstName').type('Name2')
    cy.get('#lastName').type('LastName2')
    cy.get('#userEmail').type('text2@text.com')
    cy.get('#age').type('19')
    cy.get('#salary').type('112')
    cy.get('#department').type('Qa Enginer2')
    cy.get('#submit').click()
  })
  it('should validate data in worker row after creating worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('firstName');
    cy.get('#lastName').type('lastname');
    cy.get('#userEmail').type('email@gmail.com');
    cy.get('#age').type('12')
    cy.get('#salary').type('2222');
    cy.get('#department').type('qa qa');
    
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', 'firstName');
    cy.get('.rt-td').should('contain', 'lastname');
    cy.get('.rt-td').should('contain', 'email@gmail.com');
    cy.get('.rt-td').should('contain', '12');
    cy.get('.rt-td').should('contain', '2222');
    cy.get('.rt-td').should('contain', 'qa qa');
    
  });
  it('should check search by all column values', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-td').should('contain', 'Cierra');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Vega');
    cy.get('.rt-td').should('contain', 'Vega');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('39');
    cy.get('.rt-td').should('contain', '39');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('cierra@example.com');
    cy.get('.rt-td').should('contain', 'cierra@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('10000');
    cy.get('.rt-td').should('contain', '10000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Insurance');
    cy.get('.rt-td').should('contain', 'Insurance');
  });
});

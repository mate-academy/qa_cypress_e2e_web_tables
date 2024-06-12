describe('Web table page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables')
  })

  it('should have the pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.get('.-pagination').should('contain.text', 'Previous');
    cy.get('.-pagination').should('contain.text', 'Page');
    cy.get('.-pagination').should('contain.text', 'Next');
  });

  it('should have the ability to select rows count', () => {
    cy.get('[aria-label ="rows per page"]').should('exist')
    cy.get('[aria-label ="rows per page"]').select('5 rows')
    cy.get('[aria-label ="rows per page"]').select('10 rows')
    cy.get('[aria-label ="rows per page"]').select('20 rows')
    cy.get('[aria-label ="rows per page"]').select('25 rows', { force: true })
    cy.get('[aria-label ="rows per page"]').select('50 rows', { force: true })
    cy.get('[aria-label ="rows per page"]').select('100 rows', { force: true })
  })

  it('should have the ability to add new worker', () => {
    cy.get('#addNewRecordButton').click()
    cy.get('#firstName').type('Oleh')
    cy.get('#lastName').type('Dorosh')
    cy.get('#userEmail').type('dorosh@example.com')
    cy.get('#age').type('25')
    cy.get('#salary').type('1000')
    cy.get('#department').type('Qa Enginer')
    cy.get('#submit').click()

    cy.get('.rt-tbody').should('contain', 'dorosh@example.com')
  })

  it('should have the ability to delete a worker', () => {
    cy.get('#delete-record-1').click()
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1')
  })

  it('should have the ability to delete all workes', () => {
    cy.get('#delete-record-1').click()
    cy.get('#delete-record-2').click()
    cy.get('#delete-record-3').click()
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1')
    cy.get('.rt-tbody').should('not.contain', '#delete-record-2')
    cy.get('.rt-tbody').should('not.contain', '#delete-record-3')
  })

  it('should have the ability to find worker in search field and edit', () => {
    cy.get('#searchBox').type('Alden')
    cy.get('#edit-record-2').click()
    cy.get('#department').clear().type('Manager')
    cy.get('#submit').click()
  })

  it('should provide an ability to validate data after editing', () => {
    cy.get('#edit-record-1').click();
    cy.get('#salary').clear().type('5000');
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', '5000');
  })

  it('should check search by all column values', () => {
    cy.get('#searchBox').type('Kierra');
    cy.get('.rt-td').should('contain', 'Kierra');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Gentry');
    cy.get('.rt-td').should('contain', 'Gentry');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('29');
    cy.get('.rt-td').should('contain', '29');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('kierra@example.com');
    cy.get('.rt-td').should('contain', 'kierra@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('2000');
    cy.get('.rt-td').should('contain', '2000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Legal');
    cy.get('.rt-td').should('contain', 'Legal');
  });
 
})

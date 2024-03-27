/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user
  
  beforeEach(() =>{
    cy.visit('/')
    cy.task('generateUser').then( generateUser =>{
      user = generateUser
    })
  })

  it('verify pagination', () => {
   cy.createWorkers(user, 5)
   cy.get('[aria-label="rows per page"]').select('5 rows')
   cy.contains('button', 'Next').should('not.be.disabled')
   cy.contains('button', 'Previous').should('be.disabled')
   cy.get('.-totalPages').should('contain', '2')
   cy.get('input[aria-label="jump to page"]').should('have.attr', 'value', '1');


   cy.contains('button', 'Next').click()

   cy.contains('button', 'Next').should('be.disabled')
   cy.contains('button', 'Previous').should('not.be.disabled')
   cy.get('.-totalPages').should('contain', '2')
   cy.get('input[aria-label="jump to page"]').should('have.attr', 'value', '2');
  });

  it('verify Rows count selection', () => {
    cy.verifyRows(5)
    cy.verifyRows(10)
    cy.verifyRows(20)
    cy.verifyRows(25)
    cy.verifyRows(50)
    cy.verifyRows(100)
  });

  it('should provide the ability to add worker', () => {
    cy.createWorkers(user, 1)
    cy.verifyUserCreation(user)
  });

  it('should provide the ability to delete worker', () => {
    cy.createWorkers(user, 1)
    cy.get('.rt-tbody .rt-tr-group').eq(3).then( worker =>{
      cy.wrap(worker).find('[title="Delete"]').click()
      cy.wrap(worker).should('not.exist')
    })
  });

  it('should provide the ability to delete all workers', () => {
    cy.deleteAllWorkers()
    cy.get('.rt-noData').should('contain', 'No rows found')
  });

  it('should provide the ability to edit worker', () => {
    cy.createWorkers(user, 1)
    cy.get('#searchBox').type(user.firstName)
    cy.get('.rt-tbody .rt-tr-group').eq(0).find('[title="Edit"]').click()
    cy.get('#firstName').type('{selectall} Anton')
    cy.get('#lastName').type('{selectall} Huskov')
    cy.get('#age').type('{selectall}25')
    cy.get('form').submit()
    cy.get('#searchBox').clear()
    cy.get('.rt-tbody .rt-tr-group').should('contain', 'Anton')
    .and('contain', 'Huskov')
    .and('contain', '25')
  });

  it('should provide the ability to search by all colums', () => {
    cy.createWorkers(user, 1)
    cy.searchbyColumns(user.firstName)
    cy.searchbyColumns(user.lastName)
    cy.searchbyColumns(user.email)
    cy.searchbyColumns(user.age)
    cy.searchbyColumns(user.salary)
    cy.searchbyColumns(user.department)
  })
});

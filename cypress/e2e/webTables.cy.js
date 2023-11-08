/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables')
  });

  it('should have pagination', () => {
    cy.get('.-pageInfo')
      .should('contain.text', 'Page');
    cy.get('button')
      .should('contain.text', 'Next');
    cy.get('button')
      .should('contain.text', 'Previous');
  });

  it('should have rows count selection', () => {
    cy.get('[aria-label="rows per page"]')
      .should('exist')
    cy.get('select')
      .select('5 rows');
    cy.get('select')
      .should('contain', '5 rows')
    cy.get('select')
      .select('10 rows');
    cy.get('select')
      .should('contain', '10 rows')
  });

  it('should provide an ability to add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(user.firstName);
    cy.get('#lastName')
      .type(user.lastName);
    cy.get('#userEmail')
      .type(user.userEmail);
    cy.get('#age')
      .type(user.age);
    cy.get('#salary')
      .type(user.salary);
    cy.get('#department')
      .type(user.department);
    cy.get('#submit')
      .click();
    cy.get('.rt-tr-group')
      .should('contain', user.firstName)
      .should('contain', user.lastName)
      .should('contain', user.age)
      .should('contain', user.email)
      .should('contain', user.salary)
      .should('contain', user.department);
  });

  it('should provide an ability to delete a worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-1')
      .should('not.exist');
  });

  
  it('should provide an ability to delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.get('#delete-record-1')
      .should('not.exist');
     cy.get('#delete-record-2')
       .should('not.exist');
     cy.get('#delete-record-3')
      .should('not.exist');
  });

  it('should provide an ability to find a worker, edit and validate data', () => {
    cy.get('#searchBox')
      .type('Vega');
    cy.get('#edit-record-1')
      .click();
    cy.get('#firstName')
      .type(user.firstName);
    cy.get('#lastName')
      .type(user.lastName);
    cy.get('#userEmail')
      .type(user.email);
    cy.get('#age')
      .type(user.age);
    cy.get('#salary')
      .clear()
      .type(user.salary);
    cy.get('#department')
      .type(user.department);
    cy.get('#submit')
      .click();
     cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type(firstName);
    cy.get('.rt-td')
      .should('contain', user.firstName);
    cy.get('.rt-td')
      .should('contain', user.lastName);
    cy.get('.rt-td')
      .should('contain', user.age);
    cy.get('.rt-td')
      .should('contain', user.email);
    cy.get('.rt-td')
      .should('contain', user.salary);
    cy.get('.rt-td')
      .should('contain', user.department);  
  }); 

  
  it('should check the search by all column values.', () => {
    cy.get('#searchBox')
      .type('Kierra');
    cy.get('.rt-tbody')
      .should('contain', 'Kierra');  
    cy.get('#searchBox')
      .clear()
      .type('Gentry');
    cy.get('.rt-tbody')
      .should('contain', 'Gentry'); 
    cy.get('#searchBox')
      .clear()
      .type('29');
    cy.get('.rt-tbody')
      .should('contain', '29'); 
    cy.get('#searchBox')
      .clear()
      .type('kierra@example.com');
    cy.get('.rt-tbody')
      .should('contain', 'kierra@example.com'); 
     cy.get('#searchBox')
      .clear()
      .type('2000');
    cy.get('.rt-tbody')
      .should('contain', '2000'); 
     cy.get('#searchBox')
      .clear()
      .type('Legal');
    cy.get('.rt-tbody')
      .should('contain', 'Legal'); 
  });
});

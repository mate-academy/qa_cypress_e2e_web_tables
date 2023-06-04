describe('Web Tables page', () => {
  let user;
  const testSearch = {
    firstName: 'Cierra',
    lastName : 'Vega',
    email: 'cierra@example.com',
    age: 39,
    salary: 10000,
    department: 'Insurance',
  };

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser')
      .then(generateUser => {
        user = generateUser;
    });
  });

  it('should be pagination', () => {
    cy.get('.-previous')
      .should('exist');
    cy.get('.-pageInfo')
      .should('exist');
    cy.get('.-pageSizeOptions')
      .should('exist');
    cy.get('.-next')
      .should('exist');
  });

  it('should be rows count selection', () => {
    cy.get('.-pageSizeOptions')
      .should('contain', '5 rows')
      .and('contain', '10 rows')
      .and('contain', '20 rows')
      .and('contain', '25 rows')
      .and('contain', '50 rows')
      .and('contain', '100 rows');
  });

  it('should add new worker', () => {
    cy.get('#addNewRecordButton')
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
      .type(user.salary);
    cy.get('#department')
      .type(user.department);
    cy.get('#submit')
      .click();

  });

  it('should delete worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('[role="row"]')
      .should('not.contain', testSearch.firstName);
  });

  it('should delete all worker', () => {
    cy.get('#delete-record-3').click({multiple : true});
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-1').click();
  });

  it('should find worker in search field and edit it', () => {
    cy.get('#searchBox')
      .type(testSearch.firstName);
    cy.get('[role="row"]')
      .should('contain', testSearch.firstName);
    cy.get('[title="Edit"]')
      .click();
    cy.get('#firstName')
      .clear()
      .type(user.firstName);
    cy.get('#submit')
      .click();
    cy.get('.rt-tbody')
      .should('contain', user.firstName);
  });

  it('should validate data in worker row after creating worker', () => {
    cy.get('#addNewRecordButton')
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
      .type(user.salary);
    cy.get('#department')
      .type(user.department);
    cy.get('#submit')
      .click();

    cy.get('[role="row"]')
      .should('contain', user.firstName)
      .and('contain', user.lastName)
      .and('contain', user.email)
      .and('contain', user.age)
      .and('contain', user.salary)
      .and('contain', user.department);
  });

  it('should check search by all column values', () => {
    cy.get('#searchBox')
      .type(testSearch.firstName);
    cy.get('[role="row"]')
      .should('contain', testSearch.firstName);
    cy.get('#searchBox')
      .clear()
      .type(testSearch.lastName);
    cy.get('[role="row"]')
      .should('contain', testSearch.lastName);
    cy.get('#searchBox')
      .clear()
      .type(testSearch.email);
    cy.get('[role="row"]')
        .should('contain', testSearch.email);
    cy.get('#searchBox')
      .clear()
      .type(testSearch.age);
    cy.get('[role="row"]')
        .should('contain', testSearch.age);
    cy.get('#searchBox')
      .clear()
      .type(testSearch.salary);
    cy.get('[role="row"]')
        .should('contain', testSearch.salary);
    cy.get('#searchBox')
      .clear()
      .type(testSearch.department);
    cy.get('[role="row"]')
        .should('contain', testSearch.department);
  });
});

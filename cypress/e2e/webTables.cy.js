describe('Web Tables page', () => {
  const userData = {
    firstName: 'Iia',
    lastName: 'Hnatiuk',
    email: 'iyuschaaa@gmail.com',
    age: '26',
    salary: '500',
    department: 'QA'
  };

  beforeEach(() => {
    cy.visit('/webtables')
  });

  it('should have pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .and('contain', 'Next');
    cy.contains('.-pageInfo', 'Page')
      .should('exist');
  });

  it('should have row count selection', () => {
    cy.get('select')
      .select('5 rows');
  });

  it('should provide an ability to add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(userData.firstName);
    cy.get('#lastName')
      .type(userData.lastName);
    cy.get('#userEmail')
      .type(userData.email);
    cy.get('#age')
      .type(userData.age);
    cy.get('#salary')
      .type(userData.salary);
    cy.get('#department')
      .type(userData.department);
    cy.get('#submit')
      .click();
    cy.get('.rt-tbody')
      .should('contain', userData.firstName)
      .and('contain', userData.lastName)
      .and('contain', userData.email);
    cy.get('.rt-tbody')
      .should('contain', userData.age);
    cy.get('.rt-tbody')
      .should('contain', userData.salary);
    cy.get('.rt-tbody')
      .should('contain', userData.department);
    cy.get('#searchBox')
      .clear()
      .type(userData.firstName);
    cy.get('#searchBox')
      .clear()
      .type(userData.lastName);
    cy.get('#searchBox')
      .clear()
      .type(userData.email);
    cy.get('#searchBox')
      .clear()
      .type(userData.age);
    cy.get('#searchBox')
      .clear()
      .type(userData.salary);
    cy.get('#searchBox')
      .clear()
      .type(userData.department);
  });

  it('should provide an ability to find worker in search field and edit it', () => {
    cy.get('#searchBox')
      .type('Alden');
    cy.get('.rt-td')
      .should('contain.text','Alden' + 'Cantrell');
    cy.get('#edit-record-2')
      .click();
    cy.get('#lastName')
      .clear()
      .type(userData.lastName);
    cy.get('#userEmail')
      .clear()
      .type(userData.email);
    cy.get('#age')
      .clear()
      .type(userData.age);
    cy.get('#salary')
      .clear()
      .type('3000');
    cy.get('#department')
      .clear()
      .type(userData.department);
    cy.get('#submit')
      .click();
    cy.get('.rt-td')
      .should('contain.text', 'Alden' + userData.lastName);
  });

  it('should provide an ability to delete worker', () => {
    cy.get('#delete-record-2')
      .click();
  });

  it('should provide an ability to delete all workers', () => {
  for (let i = 1; i < 4; i++) {
    cy.get('#delete-record-' + i).click();
  }
  cy.get('.rt-td').should('not.have.text', '');
  });
});

/* eslint-disable cypress/unsafe-to-chain-command */
describe('Web Tables page', () => {
  const userData = {
    firstName: 'Andrii',
    lastName: 'Kuznetsov',
    email: 'andreykuzmich91@qa.team',
    age: '32',
    salary: '1000000',
    department: 'QA'
  };
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
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
      .select('10 rows');
  });
  it('should add a new worker and find it by all column values ', () => {
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

    cy.get('.rt-tbody')
      .should('contain', userData.firstName)
      .and('contain', userData.lastName)
      .and('contain', userData.email)
      .and('contain', userData.age)
      .and('contain', userData.salary)
      .and('contain', userData.department);
  });

  it('should delete worker', () => {
    cy.get('#delete-record-2')
      .click()
      .should('not.exist');
  });
  it('should delete all workers', () => {
    cy.get('#delete-record-3')
      .click()
      .should('not.exist');
    cy.get('#delete-record-2')
      .click()
      .should('not.exist');
    cy.get('#delete-record-1')
      .click()
      .should('not.exist');
  });
  it('should find worker in search field and edit it', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('#edit-record-1')
      .click();
    cy.get('#age')
      .clear()
      .type('40');
    cy.get('#submit')
      .click();
    cy.get('.rt-tbody')
      .should('contain', 'Cierra')
      .and('contain', '40');
  });
});
